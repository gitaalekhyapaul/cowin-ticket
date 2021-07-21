import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Formik, Form, useFormikContext } from "formik";
import * as yup from "yup";

import { AuthContext } from "./Stores/AuthContext";
import APIService from "../utils/api";
import { DateTime } from "./Inputs";
import SubmitButton from "./SubmitButton";

interface ComponentProps {
  [x: string]: any;
}

const ReportButton = () => {
  const { dirty, isValid, values, validateForm } = useFormikContext();
  useEffect(() => {
    validateForm();
  }, [values]);
  if (!(dirty && isValid)) {
    return (
      <button type="button" className="btn btn-secondary disabled">
        <span className="h6">Download Report</span>
      </button>
    );
  } else {
    return (
      <button type="button" className="btn btn-info">
        <span className="h6">Download Report</span>
      </button>
    );
  }
};

const Reports = ({ ...props }: ComponentProps) => {
  const router = useRouter();
  const tabContext = useContext(AuthContext);

  const submitHandler = (
    values: { date: string },
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    console.log(values.date);
  };

  useEffect(() => {
    const checkAuth = () => {
      try {
        const API = APIService();
        if (!tabContext.auth) {
          throw "Not Authenticated!";
        } else if (tabContext.role !== "admin") {
          throw "Not Admin!";
        }
      } catch (err) {
        router.push("/login");
        toast.error("Session Expired! Please Login!");
      }
    };
    checkAuth();
  }, []);

  return (
    <>
      <div className="col-12 mb-5 my-md-3">
        <div className="row mx-auto text-center">
          <span className="h3">
            <strong>View / Download Reports</strong>
          </span>
        </div>
        <Formik
          initialValues={{ date: "" }}
          validationSchema={yup.object({
            date: yup
              .string()
              .trim()
              .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Date is Required."),
          })}
          onSubmit={(values, { setSubmitting }) => {
            submitHandler(values, setSubmitting);
          }}
        >
          <Form>
            <div className="row mx-auto d-flex align-center justify-content-center">
              <div className="col-12 col-md-3">
                <DateTime name="date" label="Date (DD/MM/YYYY)" />
              </div>
              <div className="col-12 col-md-3 mt-auto d-flex align-center justify-content-around">
                <SubmitButton textSize="h6" customText="Get Reports" />
                <ReportButton />
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Reports;
