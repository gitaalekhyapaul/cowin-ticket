import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Formik, Form, useFormikContext } from "formik";
import * as yup from "yup";

import { AuthContext } from "./Stores/AuthContext";
import APIService from "../utils/api";
import { DateTime } from "./Inputs";
import SubmitButton from "./SubmitButton";
import { DBSchema } from "../utils/schema";
import Card from "./Tabbed/Card";

interface ComponentProps {
  [x: string]: any;
}

const Reports = ({ ...props }: ComponentProps) => {
  const router = useRouter();
  const tabContext = useContext(AuthContext);
  const [cards, setCards] = useState<DBSchema[]>([]);

  const submitHandler = async (
    values: { date: string },
    setSubmitting: (isSubmitting: boolean) => void,
    resetForm: (nextState?: any) => void
  ) => {
    try {
      let API;
      try {
        API = APIService();
      } catch (err) {
        router.push("/login");
        toast.error("Session Expired! Please Login!");
      } finally {
        const { data } = (await API?.get(
          `/api/v1/tickets/get?date=${values.date}`
        )) as {
          data: { success: boolean; tickets: DBSchema[] };
        };
        setCards(data.tickets);
        setSubmitting(false);
        resetForm({ date: "" });
        toast.success("Data fetched successfully!");
      }
    } catch (err) {
      console.dir(err.response);
      if (err.response && typeof err.response.data === "string") {
        toast.error(err.response.data);
      } else if (
        err.response &&
        typeof err.response.data.success !== "undefined"
      ) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Error in fetching Reports!");
      }
    }
  };

  const ReportButton = () => {
    const { dirty, isValid, values, validateForm } =
      useFormikContext<{ date: string }>();
    const getReports = async () => {
      try {
        let API;
        try {
          API = APIService();
        } catch (err) {
          router.push("/login");
          toast.error("Session Expired! Please Login!");
        } finally {
          const { data } = await API?.get(
            `/api/v1/admin/reports?date=${values.date}`,
            {
              responseType: "blob",
            }
          )!;
          const file = new Blob([data], { type: "text/csv" });
          const fileURL = URL.createObjectURL(file);
          if (typeof window !== "undefined") {
            const link = document.createElement("a");
            link.href = fileURL;
            link.setAttribute("download", "report.csv");
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
          }
          toast.success("Report downloaded!");
        }
      } catch (err) {
        console.dir(err.response);
        if (err.response && typeof err.response.data === "string") {
          toast.error(err.response.data);
        } else if (
          err.response &&
          typeof err.response.data.success !== "undefined"
        ) {
          toast.error(err.response.data.error);
        } else {
          toast.error("Error in downloading Reports!");
        }
      }
    };
    useEffect(() => {
      validateForm();
    }, [values]);
    if (!(dirty && isValid)) {
      return (
        <button
          type="button"
          className="btn btn-secondary disabled"
          onClick={() => getReports()}
        >
          <span className="h6">Download Report</span>
        </button>
      );
    } else {
      return (
        <button
          type="button"
          className="btn btn-info"
          onClick={() => getReports()}
        >
          <span className="h6">Download Report</span>
        </button>
      );
    }
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
          onSubmit={(values, { setSubmitting, resetForm }) => {
            submitHandler(values, setSubmitting, resetForm);
          }}
        >
          <Form>
            <div className="row mx-auto d-flex align-center justify-content-center my-3">
              <div className="col-12 col-md-3">
                <DateTime name="date" label="Date (DD/MM/YYYY)" />
              </div>
              <div className="col-12 col-md-3 mt-3 mt-md-auto d-flex align-center justify-content-around">
                <SubmitButton textSize="h6" customText="Get Reports" />
                <ReportButton />
              </div>
            </div>
          </Form>
        </Formik>
        <div className="row mx-auto">
          <div
            className="col-12 d-flex"
            style={{
              height: "65vh",
              overflowY: "auto",
            }}
          >
            <div className="row mx-auto my-auto">
              {cards.length > 0 ? (
                cards.map((tkt, idx) => {
                  const status =
                    tkt.cowin.registration === "N"
                      ? "danger"
                      : tkt.cowin.registration === "Y" &&
                        tkt.status.vaccinated === false
                      ? "warning"
                      : "success";
                  return <Card key={idx} color={status} ticket={tkt} />;
                })
              ) : (
                <div className="text-center">
                  <span className="h1">
                    <strong>Please enter a date, and get reports.</strong>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
