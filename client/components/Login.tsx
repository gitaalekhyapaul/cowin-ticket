import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";

import APIService from "../utils/api";
import { AuthContext } from "./Stores/AuthContext";
import { Input } from "./Inputs";
import SubmitButton from "./SubmitButton";

const Login = () => {
  const router = useRouter();
  const API = APIService(false);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.setAuth(false);
  }, []);

  const submitHandler = async (
    values: { username: string; password: string },
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    const { username, password } = values;
    try {
      const { data } = (await API.post("/api/v1/admin/login", {
        username,
        password,
      })) as { data: { authToken: string } };
      authContext.setAuth(true);
      sessionStorage.setItem("authToken", data.authToken);
      router.push("/");
      toast.success("Login Successful!");
      setSubmitting(false);
    } catch (err) {
      if (err.response && typeof err.response.data === "string") {
        toast.error(err.response.data);
      } else if (
        err.response &&
        typeof err.response.data.success !== "undefined"
      ) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Login Failed!");
      }
    }
  };
  return (
    <>
      <div className="col-12 mb-5 my-md-3 d-flex justify-content-between align-center">
        <div className="row mx-auto">
          <div className="row mx-auto">
            <div className="col-12 text-center mb-2">
              <h1>
                <strong>Login</strong>
              </h1>
            </div>
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={yup.object({
                username: yup.string().trim().required("Username is Required."),
                password: yup.string().trim().required("Password is Required."),
              })}
              onSubmit={(values, { setSubmitting }) => {
                submitHandler(values, setSubmitting);
              }}
            >
              <Form>
                <div className="col-12">
                  <Input
                    label="Username"
                    name="username"
                    type="text"
                    placeholder="staff"
                  />
                </div>
                <div className="col-12">
                  <Input label="Password" name="password" type="password" />
                </div>
                <div className="row mx-auto my-3 text-center">
                  <div className="col-md-6 col-12 mx-auto">
                    <SubmitButton />
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
