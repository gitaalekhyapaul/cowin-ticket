import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import axios from "axios";
import { toast } from "react-toastify";

import { TicketSchema } from "../../utils/schema";
import API from "../../utils/api";

const GetOTP = () => {
  const [txnId, setTxnId] = useState("");
  const [disabled, setDisabled] = useState<{
    getOtp: boolean;
    validateOtp: boolean;
  }>({ getOtp: true, validateOtp: true });
  const { values, setFieldValue } = useFormikContext<TicketSchema>();
  const { mobile, cowin } = values;
  useEffect(() => {
    if (/^[0-9]{10}$/.test(mobile)) {
      setDisabled({ ...disabled, getOtp: false });
    } else {
      setDisabled({ ...disabled, getOtp: true });
    }
  }, [mobile]);

  useEffect(() => {
    if (
      cowin.otp &&
      /^[0-9]{6}$/.test(cowin.otp) &&
      cowin.code &&
      /^[0-9]{4}$/.test(cowin.code) &&
      !cowin.validatedOtp
    ) {
      setDisabled({ ...disabled, validateOtp: false });
    } else {
      setDisabled({ ...disabled, validateOtp: true });
    }
  }, [cowin]);

  const getOTPHandler = async () => {
    setDisabled({ ...disabled, getOtp: true });
    try {
      const { data } = (await axios.post(
        "https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP",
        {
          mobile: mobile,
        }
      )) as { data: { txnId: string } };
      toast.success("OTP sent!");
      setTxnId(data.txnId);
    } catch (err) {
      console.dir(err.response);
      if (typeof err.response.data === "string") {
        toast.error(err.response.data);
      } else {
        toast.error("Error in sending OTP!");
      }
    }
    setTimeout(() => {
      setDisabled({ ...disabled, getOtp: false });
    }, 10000);
  };

  const validateOTPHandler = async () => {
    setDisabled({ ...disabled, validateOtp: true });
    try {
      const { data } = (await API.post("/api/v1/validate/otp", {
        otp: cowin.otp,
        txnId: txnId,
        code: cowin.code,
      })) as { data: { success: boolean; beneficiaryId: string } };
      setFieldValue("cowin.beneficiaryId", data.beneficiaryId, true);
      setFieldValue("cowin.validatedOtp", data.success, true);
    } catch (err) {
      console.dir(err.response);
      if (typeof err.response.data === "string") {
        toast.error(err.response.data);
      } else {
        toast.error("Error in validating OTP!");
      }
      setDisabled({ ...disabled, validateOtp: false });
    }
  };

  if (cowin.registration === "Y") {
    return (
      <div className="form-group">
        <button
          className={
            disabled.getOtp
              ? "d-flex-inline btn btn-secondary mx-2"
              : "d-flex-inline btn btn-primary mx-2"
          }
          disabled={disabled.getOtp}
          onClick={getOTPHandler}
        >
          <span>Get OTP</span>
        </button>
        <button
          className={
            disabled.validateOtp
              ? "d-flex-inline btn btn-secondary mx-2"
              : "d-flex-inline btn btn-info mx-2"
          }
          disabled={disabled.validateOtp}
          onClick={validateOTPHandler}
        >
          <span>Validate OTP</span>
        </button>
      </div>
    );
  } else {
    return <></>;
  }
};
export default GetOTP;
