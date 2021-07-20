import React, { useEffect } from "react";
import { useRouter } from "next/router";
import APIService from "../utils/api";
import { toast } from "react-toastify";

const Protected = ({ children, ...pageProps }: any) => {
  const router = useRouter();
  useEffect(() => {
    try {
      const API = APIService();
    } catch (err) {
      router.push("/login");
      toast.error("Session Expired! Please Login!");
    }
  }, []);
  return <>{children}</>;
};

export default Protected;
