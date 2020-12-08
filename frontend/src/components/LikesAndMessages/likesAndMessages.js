import React from "react";
import "./likesAndMessages.css";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import menuIcon from "../../images/menuIcon.svg";
import mentorIcon from "../../images/mentorIcon.svg";
import heartIcon from "../../images/heartIcon.svg";
import SideBar from '../SideBar'

import Matching from "../Matching";
import { CurUserContext } from "../../curUserContext";

/* Landing page component */
class LikesAndMessages extends React.Component {
  render() {
    return (
      <Col className="no-gutters w-100"> {/* Switch this Col with Menu if user presses menu button.*/}
        <Row className="no-gutters likesOrMessages">
          <Col xs={12} xl={6} className="no-gutters">
            <text class="center bold">
              Likes<text class="numLikes">99+</text>
            </text>
          </Col>
          <Col xs={12} xl={6} className="no-gutters bigLeftBorder">
            <text class="center">
              Messages <text class="numLikes">99+</text>
            </text>
          </Col>
        </Row>
        <Row className="likesMessages no-gutters">
          {/* Space for Likes and Messages */}
          Space for Likes and Messages
        </Row>
      </Col>
    );
  }
}
LikesAndMessages.contextType = CurUserContext;

export default LikesAndMessages;
