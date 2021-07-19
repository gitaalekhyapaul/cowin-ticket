import * as yup from "yup";

export const TicketValidationSchema = yup.object({
  name: yup.string().trim().required("Name is Required."),
  age: yup
    .number()
    .positive()
    .min(18, "Age must be above 18.")
    .required("Age is Required."),
  gender: yup
    .string()
    .trim()
    .oneOf(["Male", "Female", "Others"], "Invalid Input.")
    .required("Gender is Required."),
  address: yup.string().trim().required("Address is Required."),
  pincode: yup
    .string()
    .trim()
    .length(6, "Pincode must be 6 digits.")
    .matches(/^7[0-9]{5}$/, "Pincode should start with 7.")
    .required("Pincode is Required."),
  po: yup.string().trim().required("Post Office is Required."),
  ps: yup.string().trim().required("Police Station is Required."),
  mobile: yup
    .string()
    .trim()
    .required("Mobile number is Required.")
    .matches(/^[0-9]{10}$/, "Mobile number should be 10 digits."),
  dose: yup
    .string()
    .trim()
    .oneOf(["I", "II"], "Registration must be I or II.")
    .required("Dose is Required."),
  cowin: yup
    .object({
      registration: yup
        .string()
        .trim()
        .oneOf(["Y", "N"], "Registration must be Y or N.")
        .required("Registration is Required."),
      code: yup
        .string()
        .trim()
        .matches(/^[0-9]{4}$/, "CoWin Secret Code must be 4 digits."),
      beneficiaryId: yup.string().trim(),
      otp: yup
        .string()
        .trim()
        .matches(/^[0-9]{6}$/, "OTP must be 6 digits."),
      validatedOtp: yup.boolean().isTrue(),
    })
    .test("XOR", "Either Non-CoWin or Secret Code is Required.", (values) => {
      if (values.registration === "Y" && values.code && values.beneficiaryId) {
        return true;
      } else if (values.registration === "N") {
        return true;
      } else {
        return false;
      }
    }),
  vaccine: yup
    .string()
    .trim()
    .oneOf(
      ["Covishield", "Covaxin", "Sputnik-V"],
      "Vaccine must be Covishield, Covaxin or Sputnik-V."
    )
    .required("Vaccine is Required."),
  price: yup
    .number()
    .moreThan(0, "Price must be more than 0.")
    .required("Price is Required."),
  date: yup.string().trim().required("Date is Required."),
  time: yup.string().trim().required("Time is Required."),
});

export type TicketSchema = yup.InferType<typeof TicketValidationSchema>;

export interface OtpValidationSchema {
  txnId: string;
  otp: string;
}

export enum vaccinePrice {
  "Covishield" = 780,
  "Covaxin" = 1200,
  "Sputnik-V" = 650,
}

export interface DBSchema {
  id: string;
  name: string;
  age: string;
  gender: string;
  address: string;
  pincode: string;
  po: string;
  ps: string;
  mobile: string;
  dose: string;
  cowin: {
    registration: "Y" | "N";
    beneficiaryId?: string;
  };
  vaccine: string;
  price: number;
  date: string;
  time: string;
  status: {
    vaccinated: boolean;
    batchNumber?: string;
    sideEffects?: {
      occur: boolean;
      remarks: string;
    };
  };
}
