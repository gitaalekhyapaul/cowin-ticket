import React, { useState, createContext } from "react";

export const AuthContext = createContext({
  auth: false,
  setAuth: (_auth: boolean) => {},
  role: "",
  setRole: (_role: string) => {},
});

export const AuthContextProvider = (props: any) => {
  const [auth, setAuth] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  return (
    <AuthContext.Provider value={{ role, setRole, auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};
