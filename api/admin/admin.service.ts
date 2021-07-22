import { nanoid } from "nanoid";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { parse, Options, transforms } from "json2csv";
const { unwind } = transforms;

import { errors } from "../error/error.constants";
import { DatabaseService } from "../services/database.service";
import { beneficiariesDB } from "../validate/validate.schema";

export const registerAdmin = async (
  webhook: string,
  username: string,
  password: string
): Promise<string> => {
  if (webhook !== process.env.WEBHOOK_TOKEN) {
    throw errors.UNAUTHORIZED;
  }
  const db = await DatabaseService.getInstance().getDb("credentials");
  const num = await db.countDocuments({ username: username });
  if (num !== 0) {
    throw errors.BAD_REQUEST;
  }
  const id = nanoid(9);
  const hashedPassword = await hash(password, 12);
  await db.insertOne({
    id: id,
    username: username,
    password: hashedPassword,
  });
  return id;
};

export const loginAdmin = async (
  username: string,
  password: string
): Promise<string> => {
  const db = await DatabaseService.getInstance().getDb("credentials");
  const user = await db.findOne<{ username: string; password: string }>({
    username: username,
  });
  if (!user) {
    throw errors.USER_DNE;
  }
  const validPassword = await compare(password, user.password);
  if (!validPassword) {
    throw errors.USER_DNE;
  }
  const authToken = await sign(
    { user: user!.username },
    process.env.SECRET_KEY!,
    {
      expiresIn: "1d",
    }
  );
  return authToken;
};

export const getReportArray = async (
  date?: string
): Promise<Array<beneficiariesDB>> => {
  const db = await DatabaseService.getInstance().getDb("beneficiaries");
  const beneficiaries = await db
    .find<beneficiariesDB>(
      { date: date, "status.vaccinated": true },
      {
        projection: {
          _id: 0,
        },
      }
    )
    .toArray();
  return beneficiaries;
};

export const getCSV = async (
  beneficiaries: beneficiariesDB[]
): Promise<string> => {
  const options: Options<beneficiariesDB> = {
    fields: [
      {
        label: "TOKEN NO.",
        value: "id",
      },
      {
        label: "DATE",
        value: "date",
      },
      {
        label: "BENEFICIARY NAME",
        value: "name",
      },
      {
        label: "AGE yrs.",
        value: "age",
      },
      {
        label: "GENDER (M/F/Others)",
        value: (row, field) =>
          row["gender"] === "Male"
            ? "M"
            : row["gender"] === "Female"
            ? "F"
            : "Others",
      },
      {
        label: "CONTACT NO.",
        value: "mobile",
      },
      {
        label: "REG. ID",
        value: "cowin.beneficiaryId",
      },
      {
        label: "VACCINE",
        value: "vaccine",
      },
      {
        label: "LOT NO.",
        value: "status.batchNumber",
      },
      {
        label: "DOSE (1ST/2ND)",
        value: (row, field) => (row["dose"] === "I" ? "1ST" : "2ND"),
      },
      {
        label: "SIDE EFFECTS (Y/N)",
        value: (row, field) =>
          row["status"]["sideEffects"]["occur"] === true ? "Y" : "N",
      },
      {
        label: "REMARKS",
        value: (row, field) =>
          row["status"]["sideEffects"]["remarks"] === "NA"
            ? "-"
            : row["status"]["sideEffects"]["remarks"],
      },
    ],
    transforms: [unwind({ paths: ["status.sideEffects"] })],
  };
  const csv = parse(beneficiaries, options);
  return csv;
};
