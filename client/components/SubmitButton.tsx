import React, { useEffect } from "react";
import { useFormikContext } from "formik";

import { TicketSchema } from "../utils/schema";

interface ComponentProps {
  textSize?: string;
  customText?: string;
  [x: string]: any;
}

const SubmitButton = ({ textSize, customText, ...props }: ComponentProps) => {
  const { dirty, isValid, values, validateForm } =
    useFormikContext<TicketSchema>();
  useEffect(() => {
    validateForm();
  }, [values]);
  if (!(dirty && isValid)) {
    return (
      <button disabled className="btn btn-danger">
        <span className={textSize ? textSize : "h3"}>
          {customText ? customText : "Submit"}
        </span>
      </button>
    );
  } else {
    return (
      <button type="submit" className="btn btn-success">
        <span className={textSize ? textSize : "h3"}>
          {customText ? customText : "Submit"}
        </span>
      </button>
    );
  }
};

export default SubmitButton;
