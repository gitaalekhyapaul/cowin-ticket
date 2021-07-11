import { createHash } from "crypto";
import axios from "axios";
import { decode } from "jsonwebtoken";
import { renderFile } from "ejs";
import { join } from "path";

import { errors } from "../error/error.constants";
import { validateBeneficiaryRequest } from "./validate.schema";

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
  beneficiary: validateBeneficiaryRequest
): Promise<string> => {
  const renderData = await renderFile(
    join(__dirname, "..", "..", "templates", "ticket.ejs"),
    { name: beneficiary.name, address: beneficiary.address }
  );
  return renderData;
};
