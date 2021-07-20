import React, { useState, createContext } from "react";

export const AuthContext = createContext({
  auth: false,
  setAuth: (_auth: boolean) => {},
});

export const AuthContextProvider = (props: any) => {
  const [auth, setAuth] = useState<boolean>(false);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};
