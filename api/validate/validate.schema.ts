import * as yup from "yup";

export const validateOTPRequestSchema = yup
  .object({
    code: yup
      .string()
      .trim()
      .required("OTP is Required")
      .matches(/^[0-9]{4}$/, "OTP must be 4 digits"),
    otp: yup
      .string()
      .trim()
      .required("Co-WIN Secret Code is Required")
      .matches(/^[0-9]{6}$/, "Co-WIN Secret Code must be 6 digits"),
    txnId: yup
      .string()
      .trim()
      .required("Txn ID is Required")
      .uuid("Txn ID not a valid UUID"),
  })
  .required();

export type validateOTPRequest = yup.InferType<typeof validateOTPRequestSchema>;
