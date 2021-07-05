import React from "react";
import { useFormikContext } from "formik";

import { TicketSchema } from "../utils/schema";

const SubmitButton = () => {
  const { dirty, isValid } = useFormikContext<TicketSchema>();
  if (!(dirty && isValid)) {
    return (
      <button disabled className="btn btn-danger">
        <span className="h1">Submit</span>
      </button>
    );
  } else {
    return (
      <button type="submit" className="btn btn-success">
        <span className="h1">Submit</span>
      </button>
    );
  }
};

export default SubmitButton;
