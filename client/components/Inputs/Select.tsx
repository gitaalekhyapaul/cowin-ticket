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
    <div className="form-group">
      <label className="mb-1 h5" htmlFor={props.id || props.name}>
        {label}
      </label>
      <select className="form-control" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="mt-2 alert alert-danger small p-2">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Select;
