import React from "react";
import { Formik, Form, useFormikContext } from "formik";
import { toast } from "react-toastify";

import {
  DBSchema,
  RegistrationSchema,
  RegistrationValidationSchema,
} from "../../utils/schema";
import { Input, Select, TextArea } from "../Inputs";
import SubmitButton from "../SubmitButton";

interface ComponentProps {
  ticket: DBSchema;
  resetTab: () => void;
  [x: string]: any;
}

const Remarks = () => {
  const { values } = useFormikContext<RegistrationSchema>();
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
    return <>LOLOLOL</>;
  }
};

const CompleteVac = ({ ticket, resetTab, ...props }: ComponentProps) => {
  const initValues: RegistrationSchema = {
    id: ticket.id,
    batchNumber: "",
    remarks: "",
    sideEffects: "",
  };
  const submitHandler = async (
    values: RegistrationSchema,
    hooks: {
      setSubmitting: (isSubmitting: boolean) => void;
      resetTab: () => void;
    }
  ) => {
    hooks.setSubmitting(false);
    hooks.resetTab();
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
            <div className="row mx-auto mb-3 mt-5 d-flex justify-content-end">
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
