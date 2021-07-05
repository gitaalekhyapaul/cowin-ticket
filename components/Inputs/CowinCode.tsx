import React from "react";

import Input from "./Input";

const CowinCode = ({ currCowin, ...props }: { [x: string]: any }) => {
  if (currCowin === "Y") {
    return (
      <>
        <Input
          label="Co-WIN Secret Code"
          name="cowin.code"
          type="text"
          placeholder="0000"
        />
      </>
    );
  } else {
    return <></>;
  }
};

export default CowinCode;
