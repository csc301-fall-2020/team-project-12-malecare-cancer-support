import React from "react";

// See https://reactjs.org/docs/context.html for info on the React Context

/* Context storing information about the currently logged in user */
export const CurUserContext = React.createContext({
  // These are the fields of the context, but will be initialized in the App
  // component.
  getCurrentUser: () => {
    return null;
  },
  setCurrentUser: (user) => {},
  isLoggedIn: () => {
    return false;
  },
  logout: () => {},
});
