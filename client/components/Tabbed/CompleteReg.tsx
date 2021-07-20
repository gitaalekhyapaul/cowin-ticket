import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, useFormikContext } from "formik";
import { toast } from "react-toastify";

import {
  DBSchema,
  RegistrationSchema,
  RegistrationValidationSchema,
} from "../../utils/schema";
import { Input, GetOTP, CowinCode } from "../Inputs";
import SubmitButton from "../SubmitButton";
import { TabContext } from "../Stores/TabContext";
import API from "../../utils/api";

interface ComponentProps {
  resetTab: () => void;
  [x: string]: any;
}

const ID = () => {
  const tabContext = useContext(TabContext);
  const { setFieldValue } = useFormikContext();
  useEffect(() => {
    setFieldValue("id", (tabContext.ticket as DBSchema).id, true);
  }, [tabContext]);
  return (
    <>
      <Input label="ID" name="id" type="text" placeholder="ID" readOnly />
    </>
  );
};

const Mobile = () => {
  const tabContext = useContext(TabContext);
  const { setFieldValue, setFieldTouched } = useFormikContext();
  useEffect(() => {
    setFieldValue("mobile", (tabContext.ticket as DBSchema).mobile, true);
    setFieldTouched("mobile", true);
  }, [tabContext]);
  return (
    <>
      <Input
        label="Mobile Number"
        name="mobile"
        type="text"
        placeholder="9876543210"
      />
    </>
  );
};

const CompleteReg = ({ resetTab, ...props }: ComponentProps) => {
  const tabContext = useContext(TabContext);
  const initValues = {
    id: (tabContext.ticket as DBSchema).id,
    mobile: (tabContext.ticket as DBSchema).mobile,
    cowin: {
      registration: "Y",
      code: "",
      beneficiaryId: "",
      otp: "",
      validatedOtp: undefined,
    },
  };
  const submitHandler = async (
    values: RegistrationSchema,
    hooks: {
      setSubmitting: (isSubmitting: boolean) => void;
      resetTab: () => void;
    }
  ) => {
    try {
      console.log(values);
      // const { data } = await API.post("/api/v1/update/vaccination", values);
      // toast.success("Beneficiary Vaccinated!");
      hooks.setSubmitting(false);
      hooks.resetTab();
    } catch (err) {
      if (typeof err.response.data === "string") {
        toast.error(err.response.data);
      } else if (typeof err.response.data.success !== "undefined") {
        toast.error(err.response.data.error);
      } else {
        toast.error("Error in submitting form!");
      }
    }
  };

  return (
    <>
      <div className="col-md-10 col-11">
        <Formik
          initialValues={initValues}
          validationSchema={RegistrationValidationSchema}
          validateOnMount={true}
          onSubmit={(values, { setSubmitting }) => {
            submitHandler(values, {
              setSubmitting,
              resetTab,
            });
          }}
        >
          <Form>
            <div className="row mx-auto mb-2">
              <div className="col-md-11 col-12">
                <ID />
              </div>
            </div>
            <div className="row mx-auto mb-2">
              <div className="col-md-11 col-12">
                <Mobile />
              </div>
            </div>
            <div className="row mx-auto mb-2">
              <div className="col-md-11 col-12 d-flex align-center">
                <div className="row mx-auto text-center ">
                  <GetOTP />
                </div>
              </div>
            </div>
            <div className="row mx-auto mb-2">
              <div className="col-md-11 col-12 w-100">
                <div className="row mx-auto small">
                  <CowinCode overwriteClass="col-md-12 mb-2" />
                </div>
              </div>
            </div>
            <div className="row mx-auto mb-3 mt-5 d-flex align-center">
              <div className="col-md-6 col-12 mx-auto">
                <SubmitButton />
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default CompleteReg;
