import React, { useContext } from "react";

import { TabContext } from "../Stores/TabContext";
import Card from "./Card";

interface ComponentProps {
  [x: string]: any;
}
const LeftTab = ({ ...props }: ComponentProps) => {
  const tabContext = useContext(TabContext);
  return (
    <>
      {tabContext.cards.map((tkt, idx) => {
        const status =
          tkt.cowin.registration === "N"
            ? "danger"
            : tkt.cowin.registration === "Y" && tkt.status.vaccinated === false
            ? "warning"
            : "success";
        return <Card key={idx} color={status} ticket={tkt} />;
      })}
    </>
  );
};

export default LeftTab;
