import React from "react";

/* Context storing information about the currently logged in user */
export const CurUserContext = React.createContext({
  getCurrentUser: () => {
    return null;
  },
  setCurrentUser: (user) => {},
  isLoggedIn: () => {
    return false;
  },
  logout: () => {},
});
