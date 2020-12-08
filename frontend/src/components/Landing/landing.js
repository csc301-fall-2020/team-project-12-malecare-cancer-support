import React from "react";
import "./landing.css";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import menuIcon from "../../images/menuIcon.svg";
import mentorIcon from "../../images/mentorIcon.svg";
import heartIcon from "../../images/heartIcon.svg";
import SideBar from '../SideBar'
import LikesAndMessages from '../LikesAndMessages';
import Button from "react-bootstrap/Button";
import Menu from "../Menu";

import Matching from "../Matching";
import { CurUserContext } from "../../curUserContext";


const MenuButton = props => {
    return <button onClick={props.openMenu} className="menuButton"><img class="menuIcon ml-4" src={menuIcon} /></button>
}

/* Landing page component */
class Landing extends React.Component {

  constructor(props){
    super(props)
    this.state = {isEmptyState: true, isOpenMenuState: false}
  }

  triggerOpenMenu = () => {
    this.setState({
      ...this.state,
      isEmptyState: !this.state.isEmptyState,
      isOpenMenuState: !this.state.isOpenMenuState
    })
  }

  render() {
    return (
      <div className="main no-gutters">
        <Row className="no-gutters h-100">
          <Col xs={3} className="navigation w-100 no-gutters">
            <Row className="top no-gutters topLeftNavigation">
              <MenuButton openMenu={this.triggerOpenMenu} />
            </Row>
            <Row className="bottom no-gutters">
            {/* Switch this Col with Menu if user presses menu button.*/}
              {this.state.isEmptyState && <LikesAndMessages />}
              {this.state.isOpenMenuState && <Menu />}
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
            <Row xs={10} className="bottom no-gutters bottomRightPane" >
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
