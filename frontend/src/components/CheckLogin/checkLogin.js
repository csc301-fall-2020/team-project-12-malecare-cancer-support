import React from "react";

import { Redirect } from "react-router-dom";

import { CurUserContext } from "../../curUserContext";

/* Wrapper component that uses the CurUserContext to render the Login component
instead when the user is not logged in. */
class CheckLogin extends React.Component {
  render() {
    // Note: right now, no other props besides requestedComponent are being
    // passed in, so otherProps is an empty object
    const { requestedComponent, ...otherProps } = this.props;
    // React requires components to be CamelCase
    const RequestedComponent = requestedComponent;
    return this.context.isLoggedIn() ? (
      <RequestedComponent {...otherProps} />
    ) : (
      <Redirect to="/login" />
    );
  }
}
CheckLogin.contextType = CurUserContext;

export default CheckLogin;
