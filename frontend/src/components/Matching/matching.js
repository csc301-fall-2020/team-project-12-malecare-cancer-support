import React from "react";
import "./matching.css";
import io from "socket.io-client";
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
  getMatchRecommendations,
  matchRecommendationPass,
  matchRecommendationConnect,
} from "../../actions/serverRequests";

const ENDPOINT =
  process.env.REACT_APP_SERVER_BASE_URL || "http://localhost:5000";
let socket;
class Matching extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "date",
      showToast: false,
      toastText: "",
      displayedMatch: undefined,
      upcomingMatches: [],
    };
  }

  // Get new match recommendations from the server
  getNewMatchRecomendations = async (mode) => {
    try {
      const { responseData /*, errorMessage*/ } = await getMatchRecommendations(
        this.context.getCurrentUser().accessToken,
        mode,
        this.context.getCurrentUser().userId
      );
      if (!responseData) {
        return false;
      }
      console.log("get match recommendations: ", responseData);
      // Carousel supports multiple images, but we currently just have 1 profile image per user
      for (let user of responseData) {
        user.images = [user.profileImage];
      }
      // Extend array of current matches by the response we got from server
      this.state.upcomingMatches.push(...responseData);
      this.setState({ upcomingMatches: this.state.upcomingMatches });
      return true;
    } catch (error) {
      console.log(error);
      this.setState({
        showToast: true,
        toastText:
          "We were unable to connect to the server," +
          " please make sure you have a working internet connection.",
      });
      return false;
    }
  };

  // Get new matches by calling the helper, and move to the next match
  getNewMatchesAndMove = async () => {
    const success = await this.getNewMatchRecomendations(this.state.mode);
    if (success && this.state.upcomingMatches.length > 0) {
      this.moveToNextMatch();
    } else if (success) {
      // we got an empty array back from the server
      this.setState({
        displayedMatch: undefined,
        showToast: true,
        toastText:
          "There are no more matches for now, please come back at a later time!",
      });
    } else {
      // Error connecting to server
      this.setState({
        showToast: true,
        toastText:
          "We were unable to connect to the server," +
          " please make sure you have a working internet connection.",
      });
    }
  };

  // Display the next match of this user; this method is called when the user
  // clicks "pass" or "connect" on the previously displayed match
  moveToNextMatch = async () => {
    if (this.state.upcomingMatches.length > 0) {
      const displayedMatch = this.state.upcomingMatches.shift();
      this.setState({
        displayedMatch: displayedMatch,
        upcomingMatches: this.state.upcomingMatches,
      });
    } else {
      await this.getNewMatchesAndMove();
    }
  };

  async componentDidMount() {
    this.getNewMatchesAndMove();
    socket = io(ENDPOINT);
  }

  componentWillUnmount = () => {
    socket.off();
  };

  // Handler for when the user presses the "connect" button on a match
  // recommendation.
  handleConnect = async () => {
    try {
      let { responseData, errorMessage } = await matchRecommendationConnect(
        this.context.getCurrentUser().accessToken,
        this.state.mode,
        this.context.getCurrentUser().userId,
        this.state.displayedMatch._id
      );
      if (!responseData) {
        this.setState({
          showToast: true,
          toastText: "An error occurred: " + errorMessage,
        });
        return;
      }
      // console.log("matching 'connect' server call response: ", responseData);
      if ("conversation" in responseData) {
        socket.emit(
          "newConversation",
          { ...responseData.conversation },
          ({ error }) => {
            if (error) {
              alert(error);
            }
          }
        );
        if (!responseData) {
          this.setState({
            showToast: true,
            toastText: "An error occurred: " + errorMessage,
          });
          return;
        }
        console.log(responseData);
      }
      this.moveToNextMatch();
    } catch (error) {
      this.setState({
        showToast: true,
        toastText:
          "We were unable to connect to the server," +
          " please make sure you have a working internet connection.",
      });
    }
  };

  // Handler for when the user presses the "pass" button on a match
  // recommendation.
  handlePass = async () => {
    try {
      const { responseData, errorMessage } = await matchRecommendationPass(
        this.context.getCurrentUser().accessToken,
        this.state.mode,
        this.context.getCurrentUser().userId,
        this.state.displayedMatch._id
      );
      if (!responseData) {
        this.setState({
          showToast: true,
          toastText: "An error occurred: " + errorMessage,
        });
        return;
      }
      // console.log("matching 'pass' server call response: ", responseData);
      this.moveToNextMatch();
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
      // The parent element of this component should be a Row element
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
              {/* React-bootstrap Carousel to display the other user's profile
                  pictures */}
              <Carousel
                className="carousel"
                interval={null}
                controls={displayedMatch.images.length > 1}
                indicators={displayedMatch.images.length > 1}
              >
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
              <span className="name">
                {displayedMatch.firstname + " " + displayedMatch.lastname}
              </span>
              <br></br>
              <span className="ageAndLocation">{displayedMatch.age}</span>
              <img className="middleDot" src={dotIcon} alt=""></img>
              <img className="locationIcon" src={locationIcon} alt=""></img>
              <span className="ageAndLocation">
                {displayedMatch.location.city +
                  ", " +
                  displayedMatch.location.region}
              </span>
              <br></br>
              <span className="cancerType">
                Cancer Type: {displayedMatch.cancer_types.join(", ")}
              </span>
              <br></br>
              <br></br>
              <span className="bio">{displayedMatch.bio}</span>
            </Col>
          </Row>
        )}
      </>
    );
  }
}
Matching.contextType = CurUserContext;

export default Matching;
