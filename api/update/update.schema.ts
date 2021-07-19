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

export const updateVaccinationRequestSchema = yup
  .object({
    id: yup
      .string()
      .trim()
      .matches(/^\d{5}$/, "id: should be 5 digit string")
      .required(),
    batchNumber: yup
      .string()
      .trim()
      .required("Vaccine Batch Number is Required"),
    sideEffects: yup
      .string()
      .trim()
      .oneOf(["Y", "N"], "Side Effects must br Y or N")
      .required(),
    remarks: yup.string().trim(),
  })
  .test("XOR", "Side Effects must be N or provide Remarks", (values) => {
    if (values.sideEffects === "N") {
      return true;
    } else if (
      values.sideEffects === "Y" &&
      values.remarks &&
      values.remarks?.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  })
  .noUnknown(true)
  .required();

export type updateVaccinationRequest = yup.InferType<
  typeof updateVaccinationRequestSchema
>;
