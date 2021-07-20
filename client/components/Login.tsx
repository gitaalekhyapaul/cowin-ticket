import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../utils/api";

import { DBSchema } from "../utils/schema";
import { LeftTab, RightTab } from "./Tabbed";
import { TabContext } from "./Stores/TabContext";

const Login = () => {
  return (
    <>
      <div className="col-12 mb-5 my-md-3 d-flex justify-content-between align-center">
        <div className="row mx-auto">Hello</div>
      </div>
    </>
  );
};

export default Login;
