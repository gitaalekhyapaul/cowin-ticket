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
  id: string;
}
