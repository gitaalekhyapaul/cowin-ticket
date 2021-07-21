import React, { useEffect } from "react";
import { useField, FieldConfig } from "formik";
import { Moment } from "moment";
import ReactDate from "react-datetime";
import "react-datetime/css/react-datetime.css";

interface ComponentProps {
  label: string;
  name: string;
  [x: string]: any;
}

const DateTime = ({ label, name, ...props }: ComponentProps) => {
  const [field, meta, { setValue }] = useField({
    name,
    ...props,
  } as unknown as FieldConfig<any>);

  return (
    <div className="form-group">
      <label className="mb-1 h5" htmlFor={name}>
        {label}
      </label>
      <ReactDate
        dateFormat={"DD/MM/YYYY"}
        timeFormat={false}
        input={true}
        {...field}
        {...props}
        onChange={(inp: Moment | string) =>
          setValue(typeof inp === "string" ? inp : inp.format("DD/MM/YYYY"))
        }
      />
      {meta.touched && meta.error ? (
        <div className="mt-2 alert alert-danger small p-2">{meta.error}</div>
      ) : null}
    </div>
  );
};
export default DateTime;
