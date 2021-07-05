import React, { useState } from "react";
import { Formik, Form } from "formik";

import {
  Input,
  TextArea,
  Select,
  PincodeSelect,
  Vaccine,
  CowinCode,
  Date,
  Time,
} from "../components/Inputs";
import { TicketSchema, TicketValidationSchema } from "../utils/schema";

const submitHandler = (
  values: TicketSchema,
  setSubmitting: (isSubmitting: boolean) => void
) => {
  console.dir(values);
  setSubmitting(false);
};

const initValues: TicketSchema = {
  name: "",
  age: 0,
  gender: "",
  address: "",
  pincode: "",
  po: "",
  ps: "",
  cowin: {
    code: "",
    registration: "",
  },
  vaccine: "",
  price: 0,
  date: "",
  time: "",
};

const Ticket = () => {
  const [pincode, setPincode] = useState<string>("");
  const [vaccine, setVaccine] = useState<string>("");
  const [cowin, setCowin] = useState<string>("");
  const currTime = (() => {
    if (typeof window !== "undefined") {
      const day = new window.Date();
      return `${day.getHours()}:${day.getMinutes()}:${day.getSeconds()}`;
    }
  })();
  const currDate = (() => {
    if (typeof window !== "undefined") {
      const day = new window.Date();
      return `${day.getDate()}/${day.getMonth()}/${day.getFullYear()}`;
    }
  })();
  return (
    <>
      <Formik
        initialValues={initValues}
        validationSchema={TicketValidationSchema}
        onSubmit={(values, { setSubmitting }) =>
          submitHandler(values, setSubmitting)
        }
      >
        <Form>
          <Input label="Name" name="name" type="text" placeholder="John Doe" />
          <Input label="Age" name="age" type="text" placeholder="18" />
          <Select label="Gender" name="gender">
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </Select>
          <TextArea
            label="Address"
            name="address"
            type="textarea"
            placeholder="14F/1A, Dum Dum Road, Kolkata"
          />
          <Input
            label="Pincode"
            name="pincode"
            type="text"
            placeholder="700030"
            setParam={setPincode}
          />
          <PincodeSelect getPincode={pincode} />
          <Input
            label="Police Station"
            name="ps"
            type="text"
            placeholder="Chitpore P.S"
          />
          <Select
            label="Co-WIN Registration?"
            name="cowin.registration"
            setParam={setCowin}
          >
            <option value="">Select</option>
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </Select>
          <CowinCode currCowin={cowin} />
          <Select label="Vaccine Type" name="vaccine" setParam={setVaccine}>
            <option value="">Select</option>
            <option value="Covishield">Covishield</option>
            <option value="Covaxin">Covaxin</option>
            <option value="Sputnik-V">Sputnik-V</option>
          </Select>
          <Vaccine getVaccine={vaccine} />
          <Date currDate={currDate} />
          <Time currTime={currTime} />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default Ticket;
