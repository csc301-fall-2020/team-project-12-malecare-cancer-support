import React from "react";
import "./likesAndMessages.css";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Chats from "../Chats";
import { CurUserContext } from "../../curUserContext";

/* Landing page component */
class LikesAndMessages extends React.Component {
  render() {
    return (
      <Col className="no-gutters w-100 h-100">
        <Row className="no-gutters likesOrMessages">
          <Col xs={12} xl={6} className="no-gutters">
            <text class="center">
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
          <Chats/>
        </Row>
      </Col>
    );
  }
}
LikesAndMessages.contextType = CurUserContext;

export default LikesAndMessages;
