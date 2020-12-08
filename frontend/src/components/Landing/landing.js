import React from "react";
import "./landing.css";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import menuIcon from "../../images/menuIcon.svg";
import mentorIcon from "../../images/mentorIcon.svg";
import heartIcon from "../../images/heartIcon.svg";

import Matching from "../Matching";
import { CurUserContext } from "../../curUserContext";

/* Landing page component */
class Landing extends React.Component {
  render() {
    return (
      <div className="main no-gutters">
        <Row className="no-gutters h-100">
          <Col xs={3} className="navigation w-100 no-gutters">
            <Row className="top no-gutters topLeftNavigation">
              <img class="menuIcon ml-4" src={menuIcon} />
            </Row>
            <Row className="bottom no-gutters">
              <Col className="no-gutters w-100">
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
                </Row>
              </Col>
            </Row>
          </Col>
          <Col xs={9} className="bigLeftBorder">
            <Row className="top no-gutters topRightNavigation">
              <Col xs={7} className="logo">
                CancerChat
              </Col>
              <Col xs={1}></Col>
              <Col xs={1}>
                <img class="mentorIcon" src={mentorIcon} />
              </Col>
              <Col xs={1}>
                <img class="heartIcon" src={heartIcon} />
              </Col>
              <Col xs={2}></Col>
            </Row>
            <Row xs={10} className="bottom no-gutters">
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
