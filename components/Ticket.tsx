import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, useField, FieldConfig, useFormikContext } from "formik";

import { TicketSchema, TicketValidationSchema } from "../utils/schema";

const Input = ({ label, ...props }: { [x: string]: any }) => {
  const [field, meta] = useField(props as unknown as FieldConfig<any>);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="input-group" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="alert alert-danger">{meta.error}</div>
      ) : null}
    </>
  );
};

const TextArea = ({ label, ...props }: { [x: string]: any }) => {
  const [field, meta] = useField(props as unknown as FieldConfig<any>);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea rows={3} className="input-group" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="alert alert-danger">{meta.error}</div>
      ) : null}
    </>
  );
};

const Select = ({ label, ...props }: { [x: string]: any }) => {
  const [field, meta] = useField(props as unknown as FieldConfig<any>);
  return (
    <div className="input-group d-block">
      <label className="d-block" htmlFor={props.id || props.name}>
        {label}
      </label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="alert alert-danger">{meta.error}</div>
      ) : null}
    </div>
  );
};

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
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default Ticket;
