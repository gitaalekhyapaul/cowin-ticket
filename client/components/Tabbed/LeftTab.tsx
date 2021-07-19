import React from "react";
import { DBSchema } from "../../utils/schema";

interface ComponentProps {
  tickets: Array<DBSchema>;
  setTicket: (t: DBSchema) => void;
  [x: string]: any;
}
const LeftTab = ({ tickets, setTicket, ...props }: ComponentProps) => {
  return <>Left Tab</>;
};

export default LeftTab;
