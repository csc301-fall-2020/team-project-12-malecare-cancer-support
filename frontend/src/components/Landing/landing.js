import React from "react";
import "./landing.css";

import { CurUserContext } from "../../curUserContext";

/* Landing page component */
class Landing extends React.Component {
  render() {
    return <div>Landing Page</div>;
  }
}
Landing.contextType = CurUserContext;

export default Landing;
