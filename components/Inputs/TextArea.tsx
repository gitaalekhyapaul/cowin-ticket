import React from "react";
import { useField, FieldConfig } from "formik";

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
export default TextArea;
