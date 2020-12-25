import React from "react";
import { withRouter, Link } from "react-router-dom";
import { CurUserContext } from "../../curUserContext";

class NotFound extends React.Component {
  static contextType = CurUserContext;

  render() {
    const isLoggedIn = this.context.isLoggedIn();
    const linkBack = (
      <div className="mt-3 text-center">
        <Link to={isLoggedIn ? "/landing" : "/login"}>
          <span className="mt-3 text-center">Go back</span>
        </Link>
      </div>
    );
    return (
      <div>
        <div className="mt-3 text-center">
          Error: There is no webpage at this link
        </div>
        {linkBack}
      </div>
    );
  }
}
NotFound.contextType = CurUserContext;

export default withRouter(NotFound);
