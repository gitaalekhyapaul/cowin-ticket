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

export const validateBeneficiaryRequestSchema = yup
  .object({
    name: yup.string().trim().required("Name is Required"),
    age: yup
      .number()
      .positive()
      .min(18, "Age must be above 18")
      .required("Age is Required"),
    gender: yup
      .string()
      .trim()
      .oneOf(["Male", "Female", "Others"], "Gender: Invalid Input")
      .required("Gender is Required"),
    address: yup.string().trim().required("Address is Required"),
    pincode: yup
      .string()
      .trim()
      .length(6, "Pincode must be 6 digits")
      .matches(/^[1-9]{1}[0-9]{5}$/, "Pincode should start with 1-9")
      .required("Pincode is Required"),
    po: yup.string().trim().required("Post Office is Required"),
    ps: yup.string().trim().required("Police Station is Required"),
    mobile: yup
      .string()
      .trim()
      .required("Mobile number is Required")
      .matches(/^[0-9]{10}$/, "Mobile number should be 10 digits"),
    dose: yup
      .string()
      .trim()
      .oneOf(["I", "II"], "Registration must be I or II")
      .required("Dose is Required"),
    cowin: yup
      .object({
        registration: yup
          .string()
          .trim()
          .oneOf(["Y", "N"], "Registration must be Y or N")
          .required("Registration is Required"),
        beneficiaryId: yup.string().trim(),
      })
      .test(
        "XOR",
        "Either Non-CoWin or Beneficiary ID is Required",
        (values) => {
          if (values.registration === "Y" && values.beneficiaryId) {
            return true;
          } else if (values.registration === "N") {
            return true;
          } else {
            return false;
          }
        }
      ),
    vaccine: yup
      .string()
      .trim()
      .oneOf(
        ["Covishield", "Covaxin", "Sputnik-V"],
        "Vaccine must be Covishield, Covaxin or Sputnik-V"
      )
      .required("Vaccine is Required"),
    price: yup
      .number()
      .moreThan(0, "Price must be more than 0")
      .required("Price is Required"),
    date: yup.string().trim().required("Date is Required"),
    time: yup.string().trim().required("Time is Required"),
  })
  .noUnknown(true)
  .required();

export type validateBeneficiaryRequest = yup.InferType<
  typeof validateBeneficiaryRequestSchema
>;

export const dueDate: { [x: string]: { start: number; end: number } } = {
  Covishield: {
    start: 12,
    end: 14,
  },
  Covaxin: {
    start: 4,
    end: 8,
  },
  "Sputnik-V": {
    start: 4,
    end: 4,
  },
};

export interface beneficiariesDB extends validateBeneficiaryRequest {
  id: string;
  status: {
    vaccinated: boolean;
    batchNumber: string;
    sideEffects: {
      occur: boolean;
      remarks: string;
    };
  };
}
