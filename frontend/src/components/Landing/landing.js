import React from "react";
import "./landing.css";

import { CurUserContext } from "../../curUserContext";

/* Landing page component */
class Landing extends React.Component {
  render() {
    /* Debugging: Display the accessToken as a verification of sucessful login */
    return <div>Landing Page {this.context.getCurrentUser().accessToken}</div>;
  }
}
Landing.contextType = CurUserContext;

export default Landing;
