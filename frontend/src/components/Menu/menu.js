import React from "react";
import "./menu.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CurUserContext } from "../../curUserContext";


class Menu extends React.Component {
  handleLogout = () => {
    this.context.logout();
  }

  render() {
    return (
      <Col className="no-gutters w-100 displayContents">
        <Row className="menu no-gutters displayContents">
          <Col className="col-12 no-gutters text-center">
            <img
              className="image d-block mx-auto"
              src={this.props.userData.profileImage}
              alt="profile"
            ></img>
            <text className="nameUser">
              {this.props.userData.firstname +
                " " +
                this.props.userData.lastname}
            </text>
          </Col>
          <Row className="col-12 no-gutters buttons displayContents">
            <Row className="button no-gutters text-center">Profile</Row>
            <Row className="button no-gutters text-center">Settings</Row>
            <Row className="button no-gutters text-center">Log Out</Row>
            <Row className="button no-gutters text-center"></Row>
          </Row>
        </Row>
      </Col>
    );
  }
}
Menu.contextType = CurUserContext;

export default Menu;
