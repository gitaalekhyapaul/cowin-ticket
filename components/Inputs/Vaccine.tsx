import React, { useEffect } from "react";
import { useFormikContext } from "formik";

import { TicketSchema } from "../../utils/schema";
import Input from "./Input";

const Vaccine = ({ getVaccine, ...props }: { [x: string]: any }) => {
  const { values, setFieldValue } = useFormikContext<TicketSchema>();
  useEffect(() => {
    switch (getVaccine) {
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
  }, [getVaccine]);
  return (
    <>
      <Input label="Vaccine Price" name="price" readOnly />
    </>
  );
};

export default Vaccine;
