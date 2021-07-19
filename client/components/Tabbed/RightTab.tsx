import React from "react";

import { DBSchema } from "../../utils/schema";

interface ComponentProps {
  action: string;
  ticket: DBSchema | {};
  [x: string]: any;
}

const RightTab = ({ action, ticket, ...props }: ComponentProps) => {
  return <>Right Tab</>;
};

export default RightTab;
