import React, { useEffect } from "react";
import { useField, FieldConfig } from "formik";

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

export default Select;
