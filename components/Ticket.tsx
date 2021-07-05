import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, useField, FieldConfig, useFormikContext } from "formik";
import axios from "axios";

import { TicketSchema, TicketValidationSchema } from "../utils/schema";

const Input = ({ label, setPincode, ...props }: { [x: string]: any }) => {
  const [field, meta, { setValue }] = useField(
    props as unknown as FieldConfig<any>
  );
  useEffect(() => {
    if (setPincode) {
      setPincode(field.value);
    }
  });
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

const Select = ({
  label,
  setVaccine,
  setParam,
  ...props
}: {
  [x: string]: any;
}) => {
  const [field, meta] = useField(props as unknown as FieldConfig<any>);
  useEffect(() => {
    if (setParam) {
      setParam(field.value);
    }
  });
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

const PincodeSelect = ({ getPincode, ...props }: { [x: string]: any }) => {
  const [options, setOptions] = useState<
    Array<{ name: string; value: string }>
  >([]);
  useEffect(() => {
    async function getOptions() {
      try {
        const newOptions: Array<{ name: string; value: string }> = [
          { name: "Select", value: "" },
        ];
        const { data } = await axios.get(
          `https://api.data.gov.in/resource/6176ee09-3d56-4a3b-8115-21841576b2f6?api-key=579b464db66ec23bdd00000180bd650b53b74cf87a79d820febfad38&format=json&skip=0&limit=100&filters[pincode]=${getPincode}`
        );
        if (data.records) {
          data.records.map((record: { officename: string }) => {
            newOptions.push({
              name: record.officename,
              value: record.officename,
            });
          });
        }
        setOptions(newOptions);
      } catch (err) {
        console.dir(err);
      }
    }
    getOptions();
  }, [getPincode]);
  return (
    <>
      <Select label="Post Office" name="po">
        {options.map((val, index) => {
          return (
            <option key={index} value={val.value}>
              {val.name}
            </option>
          );
        })}
      </Select>
    </>
  );
};

const Vaccine = ({ getVaccine, ...props }: { [x: string]: any }) => {
  const { values, setFieldValue } = useFormikContext<TicketSchema>();
  useEffect(() => {
    switch (getVaccine) {
      case "Covishield": {
        setFieldValue("price", 780, true);
        break;
      }
      case "Covaxin": {
        setFieldValue("price", 1170, true);
        break;
      }
      case "Sputnik-V": {
        setFieldValue("price", 650, true);
        break;
      }
      default: {
        setFieldValue("price", 0, true);
        break;
      }
    }
  }, [getVaccine]);
  return (
    <>
      <Input label="Vaccine Price" name="price" readOnly />
    </>
  );
};

const CowinCode = ({ currCowin, ...props }: { [x: string]: any }) => {
  if (currCowin === "Y") {
    return (
      <>
        <Input
          label="Co-WIN Secret Code"
          name="cowin.code"
          type="text"
          placeholder="0000"
        />
      </>
    );
  } else {
    return <></>;
  }
};

const Date = ({ currDate, ...props }: { [x: string]: any }) => {
  const { values, setFieldValue } = useFormikContext<TicketSchema>();
  useEffect(() => {
    if (currDate) {
      setFieldValue("date", currDate, true);
    }
  }, [currDate]);
  return (
    <>
      <Input label="Date" name="date" readOnly />
    </>
  );
};

const Time = ({ currTime, ...props }: { [x: string]: any }) => {
  const { values, setFieldValue } = useFormikContext<TicketSchema>();
  useEffect(() => {
    if (currTime) {
      setFieldValue("time", currTime, true);
    }
  }, [currTime]);
  return (
    <>
      <Input label="Time" name="time" readOnly />
    </>
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
            setPincode={setPincode}
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
