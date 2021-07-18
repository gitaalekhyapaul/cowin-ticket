import { createHash } from "crypto";
import axios from "axios";
import { decode } from "jsonwebtoken";
import PDFDocument from "pdfkit";
import moment from "moment";
import { ToWords } from "to-words";
import { join } from "path";

import { errors } from "../error/error.constants";
import { validateBeneficiaryRequest, dueDate } from "./validate.schema";

export const validateOtp = async (
  otp: string,
  txnId: string
): Promise<{ beneficiaryId: string }> => {
  try {
    const hashOtp = createHash("sha256").update(otp).digest("hex");
    const { data } = (await axios.post(
      "https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP",
      {
        otp: hashOtp,
        txnId,
      },
      {
        headers: {
          "User-Agent": "Node.js Runtime",
          Accept: "*/*",
        },
      }
    )) as { data: { token: string } };
    const { beneficiary_reference_id } = (await decode(data.token)) as {
      beneficiary_reference_id: string;
    };
    return {
      beneficiaryId: beneficiary_reference_id,
    };
  } catch (err) {
    if (
      typeof err.response.data.errorCode !== "undefined" &&
      err.response.data.errorCode === "USRAUT0014"
    ) {
      throw errors.INVALID_OTP;
    } else if (err.response.data) {
      console.dir(err.response.data);
      throw errors.INTERNAL_SERVER_ERROR;
    } else {
      throw err;
    }
  }
};

export const validateBeneficiary = (
  beneficiaryId: string,
  code: string
): boolean => {
  if (beneficiaryId.endsWith(code)) {
    return true;
  } else {
    throw errors.INVALID_BENEFICIARY;
  }
};

export const generateTicket = async (
  token: number | string,
  beneficiary: validateBeneficiaryRequest
): Promise<Buffer> => {
  const doc = new PDFDocument({
    autoFirstPage: false,
  });
  /**
   * Setting up the page.
   */
  doc.font("Times-Roman").fontSize(11).addPage({
    layout: "landscape",
    size: "A5",
    margin: 0,
  });
  /**
   * Setting image background.
   */
  doc.image(join(__dirname, "..", "..", "assets", "Ticket.png"), 0, 0, {
    width: 595.28,
  });
  doc.text(`${token}`, 85, 124, {
    height: 21,
    width: 137,
    align: "justify",
    baseline: "middle",
  });
  doc.rotate(-90, { origin: [558, 331] });
  doc.text(`${token}`, 558, 331, {
    height: 21,
    width: 77,
    align: "justify",
    baseline: "middle",
  });
  doc.rotate(90, { origin: [558, 331] });
  /**
   * Setting name of beneficiary
   */
  doc.text(beneficiary.name, 60, 153, {
    height: 21,
    width: 162,
    align: "justify",
    baseline: "middle",
  });
  doc.rotate(-90, { origin: [529, 189] });
  doc.text(beneficiary.name, 529, 189, {
    height: 21,
    width: 145,
    align: "justify",
    baseline: "middle",
  });
  doc.rotate(90, { origin: [529, 189] });
  /**
   * Set beneficiary dose information (dose number & due date if applicable)
   */
  const dose =
    beneficiary.dose + `${beneficiary.dose === "I" ? " (One)" : " (Two)"}`;
  const vaccineDue = moment(
    `${moment(beneficiary.date, "DD/MM/YYYY")
      .add(dueDate[beneficiary.vaccine], "days")
      .calendar()}`,
    "MM/DD/YYYY"
  ).format("DD/MM/YYYY");
  doc.text(dose, 297, 153, {
    height: 21,
    width: 40,
    align: "justify",
    baseline: "middle",
  });
  doc.rotate(-90, { origin: [530, 331] });
  doc.text(dose, 530, 331, {
    height: 21,
    width: 77,
    align: "justify",
    baseline: "middle",
  });
  doc.rotate(90, { origin: [530, 331] });
  doc.text(beneficiary.dose === "I" ? vaccineDue : "NA", 297, 290, {
    height: 21,
    width: 164,
    align: "justify",
    baseline: "middle",
  });
  /**
   * Set beneficiary mobile number
   */
  doc.text(beneficiary.mobile, 76, 371, {
    height: 21,
    width: 146,
    align: "justify",
    baseline: "middle",
  });
  doc.rotate(-90, { origin: [558, 189] });
  doc.text(beneficiary.mobile, 558, 189, {
    height: 21,
    width: 147,
    align: "justify",
    baseline: "middle",
  });
  doc.rotate(90, { origin: [558, 189] });
  /**
   * Set vaccine type
   */
  doc.text(beneficiary.vaccine.toUpperCase(), 297, 125, {
    height: 21,
    width: 164,
    align: "justify",
    baseline: "middle",
  });
  /**
   * Set vaccine price
   */
  const toWords = new ToWords({
    localeCode: "en-IN",
    converterOptions: {
      currency: true,
    },
  });
  doc.text(`Rs. ${beneficiary.price}.00 /=`, 389, 153, {
    height: 21,
    width: 72,
    align: "justify",
    baseline: "middle",
  });
  doc.text(`${toWords.convert(beneficiary.price)}`, 296, 178, {
    height: 34,
    width: 165,
    align: "justify",
    baseline: "middle",
  });
  /**
   * Set beneficiary age
   */
  doc.text(`${beneficiary.age} yrs.`, 60, 181, {
    height: 34,
    width: 44,
    align: "justify",
    baseline: "middle",
  });
  /**
   * Set beneficiary gender
   */
  doc.text(beneficiary.gender.toUpperCase(), 171, 181, {
    height: 34,
    width: 51,
    align: "justify",
    baseline: "middle",
  });
  /**
   * Set beneficiary address
   */
  doc.text(beneficiary.address, 39, 206, {
    height: 71,
    width: 183,
    align: "justify",
    baseline: "middle",
  });
  /**
   * Set beneficiary ID
   */
  doc.text(
    `${beneficiary.cowin.beneficiaryId ? beneficiary.cowin.beneficiaryId : ""}`,
    297,
    228,
    {
      height: 34,
      width: 164,
      align: "justify",
      baseline: "middle",
    }
  );
  /**
   * Set date and time
   */
  doc.text(beneficiary.date, 297, 263, {
    height: 21,
    width: 75,
    align: "justify",
    baseline: "middle",
  });
  doc.text(beneficiary.time, 386, 263, {
    height: 21,
    width: 75,
    align: "justify",
    baseline: "middle",
  });
  /**
   * Set beneficiary post office
   */
  doc.text(beneficiary.po, 77, 287, {
    height: 21,
    width: 144,
    align: "justify",
    baseline: "middle",
  });
  /**
   * Set beneficiary police station
   */
  doc.text(beneficiary.ps, 77, 315, {
    height: 21,
    width: 144,
    align: "justify",
    baseline: "middle",
  });
  /**
   * Set beneficiary ID
   */
  doc.text(beneficiary.pincode, 77, 343, {
    height: 21,
    width: 144,
    align: "justify",
    baseline: "middle",
  });
  /**
   * Finalize Changes
   */
  doc.end();
  const ticketPDF = await new Promise((resolve: (data: Buffer) => void) => {
    const buffers: any[] = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const data = Buffer.concat(buffers);
      resolve(data);
    });
  });
  return ticketPDF;
};
