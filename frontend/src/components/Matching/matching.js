import React from "react";
import "./matching.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";

import dotIcon from "../../images/dotIcon.svg";
import locationIcon from "../../images/locationIcon.svg";
import { CurUserContext } from "../../curUserContext";
import {
  getUser,
  getMatchRecommendations,
  matchRecommendationConnect,
  matchRecommendationPass,
} from "../../actions/serverRequests";

class Matching extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showToast: false,
      toastText: "Woohoo, you're reading this text in a Toast!",
      displayedMatch: undefined,
    };
  }

  async componentDidMount() {
    try {
      let { responseData, errorMessage } = await getMatchRecommendations(
        "dating",
        this.context.getCurrentUser().userId
      );
      if (!responseData) {
        this.setState({
          showToast: true,
          toastText: "An error occurred: " + errorMessage,
        });
        return;
      }
      console.log(responseData);
      if (responseData.length === 0) {
      } else {
        ({ responseData, errorMessage } = await getUser(responseData[0]));
        if (!responseData) {
          this.setState({
            showToast: true,
            toastText: "An error occurred: " + errorMessage,
          });
          return;
        }
        console.log(responseData);
        // Temporary setting below as a placeholder during development
        responseData.user.images = [
          "https://upload.wikimedia.org/wikipedia/commons/c/c2/Rihanna_Fenty_2018.png",
          "https://www.incimages.com/uploaded_files/image/1920x1080/getty_1157882721_200013432000928078_414319.jpg",
          "https://media1.popsugar-assets.com/files/thumbor/GwrkdTP4PmYn0v4dBkX1ulwT83s/1196x242:2764x1810/fit-in/500x500/filters:format_auto-!!-:strip_icc-!!-/2019/09/04/006/n/1922398/fe7006935d7044366c8982.50946989_/i/Rihanna.jpg",
        ];
        this.setState({ displayedMatch: responseData.user }); // TODO: edit this based on server return
      }
    } catch (error) {
      this.setState({
        showToast: true,
        toastText:
          "We were unable to connect to the server," +
          " please make sure you have a working internet connection.",
      });
    }
  }

  handleConnect = async () => {
    try {
      const { responseData, errorMessage } = await matchRecommendationConnect(
        "dating",
        this.context.getCurrentUser().userId,
        "targetUserId" // TODO: replace this
      );
      if (!responseData) {
        this.setState({
          showToast: true,
          toastText: "An error occurred: " + errorMessage,
        });
      } else {
        // Next recommendation
      }
    } catch (error) {
      this.setState({
        showToast: true,
        toastText:
          "We were unable to connect to the server," +
          " please make sure you have a working internet connection.",
      });
    }
  };

  handlePass = async () => {
    try {
      const { responseData, errorMessage } = await matchRecommendationPass(
        "dating",
        this.context.getCurrentUser().userId,
        "targetUserId" // TODO: replace this
      );
      if (!responseData) {
        this.setState({
          showToast: true,
          toastText: "An error occurred: " + errorMessage,
        });
      } else {
        // Next recommendation
      }
    } catch (error) {
      this.setState({
        showToast: true,
        toastText:
          "We were unable to connect to the server," +
          " please make sure you have a working internet connection.",
      });
    }
  };

  render() {
    const { displayedMatch } = this.state;
    return (
      // The parent element of this component must be a Row element
      <>
        <Toast
          show={this.state.showToast}
          className="matchingToast"
          onClose={() => this.setState({ showToast: false })}
        >
          <Toast.Header className="matchingToastHeader" />
          <Toast.Body>{this.state.toastText}</Toast.Body>
        </Toast>
        {displayedMatch === undefined ? null : (
          <Row className="no-gutters bioAndPhoto">
            <Col xs={12} lg={6} className="flex">
              <Carousel className="carousel" interval={null}>
                {displayedMatch.images.map((imageLink, index) => {
                  return (
                    <Carousel.Item key={index} className="carouselItem">
                      <Image
                        className="d-block w-100 carouselImage"
                        src={imageLink}
                        alt={`Slide ${index + 1}`}
                        fluid
                      />
                      <Carousel.Caption>
                        <Button
                          variant="outline-rounded-customGray"
                          className="likeOrPassButton matchPassButton"
                          onClick={this.handlePass}
                        >
                          Pass
                        </Button>
                        <Button
                          variant="outline-rounded-customOrange"
                          className="likeOrPassButton matchConnectButton"
                          onClick={this.handleConnect}
                        >
                          Connect
                        </Button>
                      </Carousel.Caption>
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </Col>
            <Col xs={12} lg={6} className="bioContainer">
              <text class="name">
                {displayedMatch.firstname + " " + displayedMatch.lastname}
              </text>{" "}
              <br></br>
              <text class="ageAndLocation">25</text>  {/* TODO: update this based on server return */}
              <img class="middleDot" src={dotIcon}></img>
              <img class="locationIcon" src={locationIcon}></img>
              <text class="ageAndLocation">
                {displayedMatch.location.city +
                  ", " +
                  displayedMatch.location.region}
              </text>{" "}
              <br></br>
              <text class="cancerType">Cancer Type: {displayedMatch.cancer_types.join(", ")}</text>
              <br></br>
              <br></br>
              <text class="bio">
                {displayedMatch.bio}
                {/*Most people that know me would say I am outgoing, spontaneous,
                funny and sometimes a little bit crazy.{"\n"} {"\n"}I am the
                type of woman who wears her heart on her sleeve. I truly am very
                passionate in a relationship and I am looking for someone who
                has the same values. I can be vulnerable and share my feelings
                easily. I am looking for someone who can do the same by opening
                up and who is able to express themselves.*/}
              </text>
            </Col>
          </Row>
        )}
      </>
    );
  }
}
Matching.contextType = CurUserContext;

export default Matching;

// Fonts - I used Roboto
// Between Roboto light - Roboto medium
// Colors: #E74B1A and #C4C4C4
