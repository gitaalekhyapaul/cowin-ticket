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
import SubmitButton from "./SubmitButton";
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
      return `${day.getHours() < 10 ? "0" + day.getHours() : day.getHours()}:${
        day.getMinutes() < 10 ? "0" + day.getMinutes() : day.getMinutes()
      }:${day.getSeconds() < 10 ? "0" + day.getSeconds() : day.getSeconds()}`;
    }
  })();
  const currDate = (() => {
    if (typeof window !== "undefined") {
      const day = new window.Date();
      return `${day.getDate() < 10 ? "0" + day.getDate() : day.getDate()}/${
        day.getMonth() < 10 ? "0" + day.getMonth() : day.getMonth()
      }/${
        day.getFullYear() < 10 ? "0" + day.getFullYear() : day.getFullYear()
      }`;
    }
  })();
  return (
    <div className="col-md-10 col-11">
      <Formik
        initialValues={initValues}
        validationSchema={TicketValidationSchema}
        onSubmit={(values, { setSubmitting }) =>
          submitHandler(values, setSubmitting)
        }
      >
        <Form>
          <div className="row mx-auto">
            <div className="col-md-6 col-12">
              <div className="row mx-auto mb-2">
                <div className="col-md-6 col-12">
                  <Input
                    label="Name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                  />
                </div>
                <div className="col-md-6 col-12">
                  <Input label="Age" name="age" type="text" placeholder="18" />
                </div>
              </div>
              <div className="row mx-auto mb-2">
                <TextArea
                  label="Address"
                  name="address"
                  type="textarea"
                  placeholder="14F/1A, Dum Dum Road, Kolkata"
                />
              </div>
              <div className="row mx-auto mb-2">
                <div className="col-md-6 col-12">
                  <Select label="Gender" name="gender">
                    <option value="">Select Option</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </Select>
                </div>
                <div className="col-md-6 col-12">
                  <Input
                    label="Pincode"
                    name="pincode"
                    type="text"
                    placeholder="700030"
                    setParam={setPincode}
                  />
                </div>
              </div>
              <div className="row mx-auto mb-2">
                <div className="col-12 col-md-6">
                  <PincodeSelect getPincode={pincode} />
                </div>
                <div className="col-12 col-md-6">
                  <Input
                    label="Police Station"
                    name="ps"
                    type="text"
                    placeholder="Chitpore P.S"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mx-auto mb-2">
                <div className="col-12 col-md-6">
                  <Select
                    label="Co-WIN Registration?"
                    name="cowin.registration"
                    setParam={setCowin}
                  >
                    <option value="">Select Option</option>
                    <option value="Y">Yes</option>
                    <option value="N">No</option>
                  </Select>
                </div>
                <div className="col-12 col-md-6">
                  <CowinCode currCowin={cowin} />
                </div>
              </div>
              <div className="row mx-auto mb-2">
                <div className="col-12 col-md-6">
                  <Select
                    label="Vaccine Type"
                    name="vaccine"
                    setParam={setVaccine}
                  >
                    <option value="">Select Option</option>
                    <option value="Covishield">Covishield</option>
                    <option value="Covaxin">Covaxin</option>
                    <option value="Sputnik-V">Sputnik-V</option>
                  </Select>
                </div>
                <div className="col-12 col-md-6">
                  <Vaccine getVaccine={vaccine} />
                </div>
              </div>
              <div className="row mx-auto mt-5 mb-3">
                <div className="col-12 col-md-6">
                  <Date currDate={currDate} />
                </div>
                <div className="col-12 col-md-6">
                  <Time currTime={currTime} />
                </div>
              </div>
              <div className="row mx-auto mb-3 mt-5 text-center">
                <div className="col-md-6 col-12 mx-auto">
                  <SubmitButton />
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Ticket;
