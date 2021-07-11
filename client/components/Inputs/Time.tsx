import React, { useEffect } from "react";
import { useFormikContext } from "formik";

import Input from "./Input";
import { TicketSchema } from "../../utils/schema";

const Time = ({ currTime, ...props }: { [x: string]: any }) => {
  const { values, setFieldValue } = useFormikContext<TicketSchema>();
  useEffect(() => {
    if (currTime) {
      setFieldValue("time", currTime, true);
    }
  }, [currTime]);
  return (
    <>
      <Input label="Time" name="time" readOnly />
    </>
  );
};

export default Time;
