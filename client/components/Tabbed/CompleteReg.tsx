import React, { useContext, useEffect } from "react";
import { Formik, Form, useFormikContext } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import {
  DBSchema,
  RegistrationSchema,
  RegistrationValidationSchema,
} from "../../utils/schema";
import { Input, GetOTP, CowinCode } from "../Inputs";
import SubmitButton from "../SubmitButton";
import { TabContext } from "../Stores/TabContext";
import APIService from "../../utils/api";

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
  const { setFieldValue } = useFormikContext();
  useEffect(() => {
    setFieldValue("mobile", (tabContext.ticket as DBSchema).mobile, false);
  }, [tabContext]);
  return (
    <>
      <Input
        label="Beneficiary ID"
        name="beneficiaryId"
        type="text"
        placeholder="XXXXXXXXXXXXXX"
      />
    </>
  );
};

const CompleteReg = ({ resetTab, ...props }: ComponentProps) => {
  const router = useRouter();
  const tabContext = useContext(TabContext);
  const initValues = {
    id: (tabContext.ticket as DBSchema).id,
    beneficiaryId: "-",
  };
  const submitHandler = async (
    values: RegistrationSchema,
    hooks: {
      setSubmitting: (isSubmitting: boolean) => void;
      resetTab: () => void;
    }
  ) => {
    try {
      let API;
      try {
        API = APIService();
      } catch (err) {
        router.push("/login");
        toast.error("Session Expired! Please Login!");
      } finally {
        const { data } = await API?.post("/api/v1/update/beneficiary", {
          id: values.id,
          beneficiaryId: values.beneficiaryId,
        })!;
        toast.success("Beneficiary Registered!");
        hooks.setSubmitting(false);
        hooks.resetTab();
      }
    } catch (err) {
      if (err.response && typeof err.response.data === "string") {
        toast.error(err.response.data);
      } else if (
        err.response &&
        typeof err.response.data.success !== "undefined"
      ) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Error in submitting form!");
      }
    }
  };

  return (
    <>
      <div className="col-md-10 col-11">
        <div className="row mx-auto mb-2">
          <div className="col-md-11 col-12 text-center h5">
            <strong>Complete Registration</strong>
          </div>
        </div>
        <Formik
          initialValues={initValues}
          validationSchema={RegistrationValidationSchema}
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
            <div className="row mx-auto mb-3 mt-3 d-flex justify-content-center align-center">
              <div className="col-md-6 col-12 text-center">
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
