import React, { useState, createContext, PropsWithChildren } from "react";
import { DBSchema } from "../../utils/schema";

export const TabContext = createContext({
  action: "",
  ticket: {},
  cards: [] as DBSchema[],
  setAction: (_action: string) => {},
  setTicket: (_ticket: DBSchema | {}) => {},
  setCards: (_tickets: DBSchema[]) => {},
});

export const TabContextProvider = (props: any) => {
  const [action, setAction] = useState<string>("");
  const [ticket, setTicket] = useState<DBSchema | {}>({});
  const [cards, setCards] = useState<Array<DBSchema> | []>([]);
  return (
    <TabContext.Provider
      value={{ action, setAction, cards, setCards, ticket, setTicket }}
    >
      {props.children}
    </TabContext.Provider>
  );
};
