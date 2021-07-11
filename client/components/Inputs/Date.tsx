import React, { useEffect } from "react";
import { useFormikContext } from "formik";

import Input from "./Input";
import { TicketSchema } from "../../utils/schema";

const Date = ({ currDate, ...props }: { [x: string]: any }) => {
  const { values, setFieldValue } = useFormikContext<TicketSchema>();
  useEffect(() => {
    if (currDate) {
      setFieldValue("date", currDate, true);
    }
  }, []);
  return (
    <>
      <Input label="Date" name="date" readOnly />
    </>
  );
};

export default Date;
