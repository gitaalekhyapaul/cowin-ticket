import React, { useEffect } from "react";
import { useFormikContext } from "formik";

import Input from "./Input";
import { TicketSchema } from "../../utils/schema";

interface ComponentProps {
  currDate: string;
  [x: string]: any;
}

const Date = ({ currDate, ...props }: ComponentProps) => {
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
