import { useFormikContext } from "formik";
import React from "react";
import { TicketSchema } from "../../utils/schema";

import Input from "./Input";

const CowinCode = () => {
  const { values } = useFormikContext();
  const { cowin } = values as TicketSchema;
  if (cowin.registration === "Y") {
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

export default CowinCode;
