import React from "react";
import "./profile.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import Toast from "react-bootstrap/Toast";

import dotIcon from "../../images/dotIcon.svg";
import locationIcon from "../../images/locationIcon.svg";
import SideBar from "../SideBar";
import { CurUserContext } from "../../curUserContext";
import { getUser } from "../../actions/serverRequests";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showToast: false,
      toastText: "",
      userData: undefined,
    };
  }

  async componentDidMount() {
    const curUser = this.context.getCurrentUser();
    const { responseData, errorMessage } = await getUser(
      curUser.accessToken,
      curUser.userId
    );
    if (!responseData) {
      this.setState({
        showToast: true,
        toastText:
          errorMessage.length > 0
            ? errorMessage
            : "We were unable to connect to the server," +
              " please make sure you have a working internet connection.",
      });
      return;
    }
    // Carousel supports multiple images, but we currently just have 1 profile image per user
    responseData.user.images = [responseData.user.profileImage];
    this.setState({ userData: responseData.user });
  }

  render() {
    const { userData } = this.state;
    return (
      <div className="profile-main no-gutters">
        <SideBar />
        <Row className="no-gutters h-100">
          <Toast
            show={this.state.showToast}
            className="profile-Toast"
            onClose={() => this.setState({ showToast: false })}
          >
            <Toast.Header className="profile-ToastHeader" />
            <Toast.Body>{this.state.toastText}</Toast.Body>
          </Toast>
          <Col>
            <Row className="mx-auto mb-3 h5 text-center d-block">
              Preview how your profile appears to other users:
            </Row>
            {userData === undefined ? null : (
              <Row className="no-gutters bioAndPhoto">
                <Col xs={12} lg={6} className="flex">
                  {/* React-bootstrap Carousel to display the other user's profile
                  pictures */}
                  <Carousel
                    interval={null}
                    controls={userData.images.length > 1}
                    indicators={userData.images.length > 1}
                  >
                    {userData.images.map((imageLink, index) => {
                      return (
                        <Carousel.Item key={index}>
                          <Image
                            className="d-block w-100 profile-carouselImage"
                            src={imageLink}
                            alt={`Slide ${index + 1}`}
                            fluid
                          />
                        </Carousel.Item>
                      );
                    })}
                  </Carousel>
                </Col>
                <Col xs={12} lg={6} className="profile-bioContainer">
                  <span className="profile-name">
                    {userData.firstname + " " + userData.lastname}
                  </span>
                  <br></br>
                  <span className="profile-ageAndLocation">{userData.age}</span>
                  <img className="profile-middleDot" src={dotIcon} alt=""></img>
                  <img
                    className="profile-locationIcon"
                    src={locationIcon}
                    alt=""
                  ></img>
                  <span className="profile-ageAndLocation">
                    {userData.location.city + ", " + userData.location.region}
                  </span>
                  <br></br>
                  <span className="profile-cancerType">
                    Cancer Type: {userData.cancer_types.join(", ")}
                  </span>
                  <br></br>
                  <br></br>
                  <span className="profile-bio">{userData.bio}</span>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}
Profile.contextType = CurUserContext;

export default Profile;
