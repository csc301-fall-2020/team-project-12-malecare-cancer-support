import React from "react";
import "./landing.css";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import menuIcon from "../../images/menuIcon.svg";
import mentorIcon from "../../images/mentorIcon.svg";
import heartIcon from "../../images/heartIcon.svg";
import SideBar from "../SideBar";
import LikesAndMessages from "../LikesAndMessages";
import Menu from "../Menu";

import Matching from "../Matching";
import { getUser } from "../../actions/serverRequests";
import { CurUserContext } from "../../curUserContext";

const MenuButton = (props) => {
  return (
    <button onClick={props.openMenu} className="menuButton">
      <img className="menuIcon ml-4" src={menuIcon} alt="button to open menu" />
    </button>
  );
};

/* Landing page component */
class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isEmptyState: true, isOpenMenuState: false, userData: {} };
  }

  async componentDidMount() {
    const curUser = this.context.getCurrentUser();
    const { responseData, errorMessage } = await getUser(
      curUser.accessToken,
      curUser.userId
    );
    if (!responseData) {
      console.log("An error occurred: " + errorMessage);
      return;
    }
    // console.log("landing page get currentUser : ", responseData);
    this.setState({ userData: responseData.user });
  }

  triggerOpenMenu = () => {
    this.setState({
      ...this.state,
      isEmptyState: !this.state.isEmptyState,
      isOpenMenuState: !this.state.isOpenMenuState,
    });
  };

  render() {
    return (
      <div className="main no-gutters">
      <SideBar className='sidebar'></SideBar>
        <Row className="no-gutters h-100">
          {/* <Col xs={3} className="navigation w-100 no-gutters">
            <Row className="top no-gutters topLeftNavigation">
              <MenuButton openMenu={this.triggerOpenMenu} />
            </Row>
            <Row className="bottom no-gutters">
               Switch this Col with Menu if user presses menu button.
              {this.state.isEmptyState && <LikesAndMessages />}
              {this.state.isOpenMenuState && (
                <Menu userData={this.state.userData} />
              )}
            </Row>
          </Col> */}
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
