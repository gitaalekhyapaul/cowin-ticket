import React from "react";

import { DBSchema } from "../../utils/schema";
import CompleteVac from "./CompleteVac";

interface ComponentProps {
  action: string;
  ticket: DBSchema | {};
  resetTab: () => void;
  [x: string]: any;
}

const RightTab = ({ action, ticket, resetTab, ...props }: ComponentProps) => {
  if (action === "" || Object.keys(ticket).length === 0) {
    return (
      <>
        <h1 className="text-center">
          <strong>Please Select a Card to Continue.</strong>
        </h1>
      </>
    );
  } else if (action === "vaccination") {
    return (
      <CompleteVac ticket={ticket as unknown as DBSchema} resetTab={resetTab} />
    );
  } else {
    return <>Right Tab</>;
  }
};

export default RightTab;
