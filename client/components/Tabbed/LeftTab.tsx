import React from "react";
import { DBSchema } from "../../utils/schema";
import Card from "./Card";

interface ComponentProps {
  tickets: Array<DBSchema>;
  setTicket: (t: DBSchema) => void;
  setAction: (a: string) => void;
  [x: string]: any;
}
const LeftTab = ({
  tickets,
  setTicket,
  setAction,
  ...props
}: ComponentProps) => {
  return (
    <>
      {console.log(tickets)}
      {tickets.map((tkt, idx) => {
        const status =
          tkt.cowin.registration === "N"
            ? "danger"
            : tkt.cowin.registration === "Y" && tkt.status.vaccinated === false
            ? "warning"
            : "success";
        return (
          <Card
            key={idx}
            color={status}
            ticket={tkt}
            setTicket={setTicket}
            setAction={setAction}
          />
        );
      })}
    </>
  );
};

export default LeftTab;
