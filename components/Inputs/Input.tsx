import React, { useEffect } from "react";
import { useField, FieldConfig } from "formik";

const Input = ({ label, setParam, ...props }: { [x: string]: any }) => {
  const [field, meta, { setValue }] = useField(
    props as unknown as FieldConfig<any>
  );
  useEffect(() => {
    if (setParam) {
      setParam(field.value);
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
export default Input;
