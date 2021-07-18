import React from "react";
import { LeftTab } from "./Tabbed";

const Vaccinate = () => {
  return (
    <>
      <div className="col-md-10 col-11">
        <div className="row mx-auto text-center mb-0 mb-md-5">
          <h1>
            <strong>Vaccinate</strong>
          </h1>
        </div>
        <div className="row mx-auto text-center">
          <div
            className="col-12 col-md-8 d-flex"
            style={{
              height: "65vh",
              overflowY: "auto",
            }}
          >
            <div className="row mx-auto my-auto">Hello</div>
          </div>
          <div className="col-12 col-md-4 d-flex">
            <div className="row mx-auto my-auto">
              <LeftTab />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vaccinate;
