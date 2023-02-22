import React from "react";

export const AppContext = React.createContext(
  {
    loggedIn: false,
    setLogin: () => {},
  },
  { user: {}, setUserContext: () => {} }
);

export const UserContext = React.createContext({
  user: {},
  setUserContext: () => {},
});
