import * as yup from "yup";

export const getTicketRequestSchema = yup
  .object({
    date: yup
      .string()
      .trim()
      .matches(
        /^\d{2}\/\d{2}\/\d{4}$/,
        "date: Invalid Date Format. Valid Format: DD/MM/YYYY"
      ),
    vaccinated: yup.boolean().typeError("vaccinated: Should be boolean"),
    rev: yup.boolean().typeError("rev: Should be boolean"),
  })
  .noUnknown(true)
  .required();

export type getTicketRequest = yup.InferType<typeof getTicketRequestSchema>;
