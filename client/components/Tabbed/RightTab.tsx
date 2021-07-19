import React from "react";

import { DBSchema } from "../../utils/schema";

interface ComponentProps {
  action: string;
  ticket: DBSchema | {};
  [x: string]: any;
}

const RightTab = ({ action, ticket, ...props }: ComponentProps) => {
  if (action === "" || Object.keys(ticket).length === 0) {
    return (
      <>
        <h1 className="text-center">
          <strong>Please Select a Card to Continue.</strong>
        </h1>
      </>
    );
  } else {
    return <>Right Tab</>;
  }
};

export default RightTab;
