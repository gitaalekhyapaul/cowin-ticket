import React, { useEffect } from "react";
import { useFormikContext } from "formik";

import { TicketSchema } from "../../utils/schema";
import Input from "./Input";

const Vaccine = () => {
  const { values, setFieldValue } = useFormikContext<TicketSchema>();
  const { vaccine } = values as TicketSchema;
  useEffect(() => {
    switch (vaccine) {
      case "Covishield": {
        setFieldValue("price", 780, true);
        break;
      }
      case "Covaxin": {
        setFieldValue("price", 1170, true);
        break;
      }
      case "Sputnik-V": {
        setFieldValue("price", 650, true);
        break;
      }
      default: {
        setFieldValue("price", 0, true);
        break;
      }
    }
  }, [vaccine]);
  return (
    <>
      <Input label="Vaccine Price" name="price" readOnly />
    </>
  );
};

export default Vaccine;
