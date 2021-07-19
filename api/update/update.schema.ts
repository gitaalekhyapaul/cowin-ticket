import * as yup from "yup";

export const updateBeneficiaryRequestSchema = yup
  .object({
    id: yup
      .string()
      .trim()
      .matches(/^\d{5}$/, "id: should be 5 digit string")
      .required(),
    beneficiaryId: yup.string().trim().required("Beneficiary ID is Required"),
  })
  .noUnknown(true)
  .required();

export type updateBeneficiaryRequest = yup.InferType<
  typeof updateBeneficiaryRequestSchema
>;
