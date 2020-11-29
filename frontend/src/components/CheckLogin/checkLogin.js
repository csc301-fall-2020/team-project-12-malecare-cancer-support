import React from "react";

import { CurUserContext } from "../../curUserContext";
import Login from "../Login";

/* Wrapper component that uses the CurUserContext to render the Login component
instead when the user is not logged in. */
class CheckLogin extends React.Component {
  render() {
    const { requestedComponent, ...otherProps } = this.props;
    // React requires components to be CamelCase
    const RequestedComponent = requestedComponent;
    return this.context.isLoggedIn() ? (
      <RequestedComponent {...otherProps} />
    ) : (
      <Login {...otherProps} redirect={true} />
    );
  }
}
CheckLogin.contextType = CurUserContext;

export default CheckLogin;
