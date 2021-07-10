import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import axios from "axios";

import { TicketSchema } from "../../utils/schema";

const GetOTP = ({ setTxnId, ...props }: { [x: string]: any }) => {
  const [disabled, setDisabled] = useState(true);
  const { values } = useFormikContext();
  const { mobile, cowin } = values as TicketSchema;
  useEffect(() => {
    if (/^[0-9]{10}$/.test(mobile)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [mobile]);
  const submitHandler = async () => {
    setDisabled(true);
    try {
      const { data } = (await axios.post(
        "https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP",
        {
          mobile: mobile,
        }
      )) as { data: { txnId: string } };
      setTxnId(data.txnId);
    } catch (err) {
      console.dir(err.response);
    }
    setTimeout(() => {
      setDisabled(false);
    }, 10000);
  };
  if (cowin.registration === "Y") {
    return (
      <div className="form-group">
        <button
          className={
            disabled ? "d-flex btn btn-secondary" : "d-flex btn btn-primary"
          }
          disabled={disabled}
          onClick={submitHandler}
        >
          <span>Get OTP</span>
        </button>
      </div>
    );
  } else {
    return <></>;
  }
};
export default GetOTP;
