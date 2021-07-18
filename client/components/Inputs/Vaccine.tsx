import React, { useEffect } from "react";
import { useFormikContext } from "formik";

import { TicketSchema, vaccinePrice } from "../../utils/schema";
import Input from "./Input";

const Vaccine = () => {
  const { values, setFieldValue } = useFormikContext<TicketSchema>();
  const { vaccine } = values;
  useEffect(() => {
    switch (vaccine) {
      case "Covishield": {
        setFieldValue("price", vaccinePrice["Covishield"], true);
        break;
      }
      case "Covaxin": {
        setFieldValue("price", vaccinePrice["Covaxin"], true);
        break;
      }
      case "Sputnik-V": {
        setFieldValue("price", vaccinePrice["Sputnik-V"], true);
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
