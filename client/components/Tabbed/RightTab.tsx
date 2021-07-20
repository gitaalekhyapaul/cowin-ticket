import React, { useContext } from "react";

import CompleteVac from "./CompleteVac";
import CompleteReg from "./CompleteReg";
import { TabContext } from "../Stores/TabContext";

interface ComponentProps {
  resetTab: () => void;
  [x: string]: any;
}

const RightTab = ({ resetTab, ...props }: ComponentProps) => {
  const tabContext = useContext(TabContext);

  if (tabContext.action === "" || Object.keys(tabContext.ticket).length === 0) {
    return (
      <>
        <h1 className="text-center">
          <strong>Please Select a Card to Continue.</strong>
        </h1>
      </>
    );
  } else if (
    tabContext.action === "vaccination" &&
    Object.keys(tabContext.ticket).length > 0
  ) {
    return <CompleteVac resetTab={resetTab} />;
  } else {
    return <CompleteReg resetTab={resetTab} />;
  }
};

export default RightTab;
