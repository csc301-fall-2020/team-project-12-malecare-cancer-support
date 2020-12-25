import React from "react";
import "./landing.css";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import SideBar from "../SideBar";
import Matching from "../Matching";
import { CurUserContext } from "../../curUserContext";

/* Landing page component */
class Landing extends React.Component {
  render() {
    return (
      <div className="main no-gutters">
        <SideBar className="sidebar"></SideBar>
        <Row className="no-gutters h-100">
          <Col>
            <Row className="bottom no-gutters bottomRightPane">
              <Matching />
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
Landing.contextType = CurUserContext;

export default Landing;
