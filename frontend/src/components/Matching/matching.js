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
  matchRecommendationPass,
  matchRecommendationConnect,
  createConversation,
} from "../../actions/serverRequests";

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

  getNewMatchRecomendations = async (mode) => {
    try {
      const { responseData, errorMessage } = await getMatchRecommendations(
        mode,
        this.context.getCurrentUser().userId
      );
      if (!responseData) {
        return false;
      }
      console.log(responseData);
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

  getNewMatchesAndMove = async () => {
    const success = await this.getNewMatchRecomendations(this.state.mode);
    if (success && this.state.upcomingMatches.length > 0) {
      this.moveToNextMatch();
    } else if (success) {
      // we got an empty array back from the server
      this.setState({
        showToast: true,
        toastText:
          "There are no more matches for now, please come back at a later time!",
      });
    }
  };

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
  }

  handleConnect = async () => {
    try {
      let { responseData, errorMessage } = await matchRecommendationConnect(
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
      if (typeof responseData === "string") {
        // TODO: edit this based on server response
        // TODO: we got a match, responseData is the id of the target user as string
        ({ responseData, errorMessage } = await createConversation(
          this.state.mode,
          this.context.getCurrentUser().userId,
          responseData
        ));
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

  handlePass = async () => {
    console.log("got inside handlePass");
    try {
      const { responseData, errorMessage } = await matchRecommendationPass(
        this.state.mode,
        this.context.getCurrentUser().userId,
        this.state.displayedMatch._id
      );
      if (!responseData) {
        this.setState({
          showToast: true,
          toastText: "An error occurred: " + errorMessage,
        });
      } else {
        this.moveToNextMatch();
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
              <Carousel
                className="carousel"
                interval={null}
                controls={displayedMatch.images.length > 1}
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
              <text class="name">
                {displayedMatch.firstname + " " + displayedMatch.lastname}
              </text>{" "}
              <br></br>
              <text class="ageAndLocation">25</text>{" "}
              {/* TODO: update this based on server return */}
              <img class="middleDot" src={dotIcon}></img>
              <img class="locationIcon" src={locationIcon}></img>
              <text class="ageAndLocation">
                {displayedMatch.location.city +
                  ", " +
                  displayedMatch.location.region}
              </text>{" "}
              <br></br>
              <text class="cancerType">
                Cancer Type: {displayedMatch.cancer_types.join(", ")}
              </text>
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
