import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import { TicketSchema } from "../../utils/schema";

import Input from "./Input";

const CowinCode = () => {
  const { values, setFieldValue } = useFormikContext<TicketSchema>();
  const { cowin } = values;
  useEffect(() => {
    if (cowin.registration === "N") {
      setFieldValue("cowin.validatedOtp", true, true);
    } else if (!cowin.beneficiaryId) {
      setFieldValue("cowin.validatedOtp", false, true);
    }
  }, [cowin]);
  if (cowin.registration === "Y") {
    return (
      <>
        <div className="col-12 col-md-6">
          <Input
            label="Co-WIN Secret Code"
            name="cowin.code"
            type="text"
            placeholder="0000"
          />
        </div>
        <div className="col-12 col-md-6">
          <Input
            label="Mobile OTP"
            name="cowin.otp"
            type="text"
            placeholder="000000"
          />
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default CowinCode;
