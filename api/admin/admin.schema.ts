import * as yup from "yup";

export const adminRegisterSchema = yup
  .object({
    webhook: yup.string().trim().required(),
    username: yup.string().trim().required(),
    password: yup.string().trim().required(),
  })
  .noUnknown(true)
  .required();

export type adminRegister = yup.InferType<typeof adminRegisterSchema>;

export const adminLoginSchema = yup
  .object({
    username: yup.string().trim().required(),
    password: yup.string().trim().required(),
  })
  .noUnknown(true)
  .required();

export type adminLogin = yup.InferType<typeof adminLoginSchema>;

export interface userInfo {
  user: string;
}

export const getReportsSchema = yup
  .object({
    date: yup
      .string()
      .trim()
      .matches(
        /^\d{2}\/\d{2}\/\d{4}$/,
        "date: Invalid Date Format. Valid Format: DD/MM/YYYY"
      )
      .required("Date is Required"),
  })
  .noUnknown(true)
  .required();

export type getReports = yup.InferType<typeof getReportsSchema>;
