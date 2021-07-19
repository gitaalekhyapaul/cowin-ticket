import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, useFormikContext } from "formik";
import { toast } from "react-toastify";

import {
  DBSchema,
  RegistrationSchema,
  RegistrationValidationSchema,
} from "../../utils/schema";
import { Input, Select, TextArea } from "../Inputs";
import SubmitButton from "../SubmitButton";
import { TabContext } from "../Stores/TabContext";
import API from "../../utils/api";

interface ComponentProps {
  resetTab: () => void;
  [x: string]: any;
}

const Remarks = () => {
  const {
    values,
    errors,
    touched,
    setTouched,
    setFieldValue,
    setFieldError,
    setErrors,
  } = useFormikContext<RegistrationSchema>();

  useEffect(() => {
    if (values.sideEffects === "Y") {
      setTouched({ ...touched, remarks: true });
      setErrors({ ...errors, remarks: "Enter Remarks!" });
    } else if (values.sideEffects === "N" && values.remarks === "-") {
      setFieldValue("remarks", "", true);
    } else if (!touched.sideEffects && values.sideEffects === "Y") {
    }
  }, [values]);

  if (values.sideEffects === "Y") {
    return (
      <div className="row mx-auto mb-2">
        <div className="col-md-11 col-12">
          <TextArea
            label="Remarks"
            name="remarks"
            type="textarea"
            placeholder="Details of the side effects..."
          />
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

const CompleteVac = ({ resetTab, ...props }: ComponentProps) => {
  const tabContext = useContext(TabContext);
  const [initValues, setInitValues] = useState<RegistrationSchema>({
    id: (tabContext.ticket as DBSchema).id,
    batchNumber: "",
    remarks: "-",
    sideEffects: "",
  });
  const submitHandler = async (
    values: RegistrationSchema,
    hooks: {
      setSubmitting: (isSubmitting: boolean) => void;
      resetTab: () => void;
    }
  ) => {
    try {
      const { data } = await API.post("/api//v1/update/vaccination", values);
      toast.success("Beneficiary Vaccinated!");
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
                <Input
                  label="ID"
                  name="id"
                  type="text"
                  placeholder="ID"
                  readOnly
                />
              </div>
            </div>
            <div className="row mx-auto mb-2">
              <div className="col-md-11 col-12">
                <Input
                  label="Vaccine Batch Number"
                  name="batchNumber"
                  type="text"
                  placeholder="XXXXXX"
                />
              </div>
            </div>
            <div className="row mx-auto mb-2">
              <div className="col-md-11 col-12">
                <Select label="Any Side Effects?" name="sideEffects">
                  <option value="">Select Option</option>
                  <option value="Y">Yes</option>
                  <option value="N">No</option>
                </Select>
              </div>
            </div>
            <Remarks />
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

export default CompleteVac;
