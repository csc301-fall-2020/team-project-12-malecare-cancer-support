import React from "react";
import "./menu.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


class Menu extends React.Component {
  render() {
    return (
      <Col className="no-gutters w-100">
        <Row className="menu no-gutters">
          <Row className="no-gutters displayContents">
            <Col className="col-12 no-gutters text-center">
              <img class="image d-block mx-auto" src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE4MDAzNDEwMzUwMjc4MTU4/chris-brown-265946-1-402.jpg"></img>
              <text class="nameUser">Chris Brown</text>
            </Col>
            <Col className="col-12 no-gutters buttons">
              <Col className="button no-gutters text-center">Profile</Col>
              <Col className="button no-gutters text-center">Settings</Col>
              <Col className="button no-gutters text-center">Log Out</Col>
              <Col className="button no-gutters text-center"></Col>
            </Col>
          </Row>
        </Row>
      </Col>
    );
  }
}

export default Menu;
