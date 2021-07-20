import React from "react";
import axios from "axios";
import { decode, JwtPayload } from "jsonwebtoken";

const API = (auth: boolean = true) => {
  if (!auth) {
    return axios.create({
      baseURL:
        process.env.NODE_ENV === "production" ? "" : "http://localhost:8000",
    });
  }
  const authToken = sessionStorage.getItem("authToken");
  if (!authToken) {
    throw "NotAuthenticatedError";
  }
  const payload = decode(authToken);
  if ((payload as JwtPayload).exp) {
    const now = Date.now().valueOf() / 1000;
    if ((payload as JwtPayload).exp! < now) {
      throw "NotAuthenticatedError";
    }
  } else {
    throw "NotAuthenticatedError";
  }
  const instance = axios.create({
    baseURL:
      process.env.NODE_ENV === "production" ? "" : "http://localhost:8000",
  });
  instance.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
  return instance;
};

export default API;
