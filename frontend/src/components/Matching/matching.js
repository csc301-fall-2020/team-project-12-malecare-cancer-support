import React from "react";
import "./matching.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import dotIcon from "../../images/dotIcon.svg";
import locationIcon from "../../images/locationIcon.svg";

class Matching extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [
        {
          imageLink:
            "https://upload.wikimedia.org/wikipedia/commons/c/c2/Rihanna_Fenty_2018.png",
        },
        {
          imageLink:
            "https://www.incimages.com/uploaded_files/image/1920x1080/getty_1157882721_200013432000928078_414319.jpg",
        },
        {
          imageLink: "https://media1.popsugar-assets.com/files/thumbor/GwrkdTP4PmYn0v4dBkX1ulwT83s/1196x242:2764x1810/fit-in/500x500/filters:format_auto-!!-:strip_icc-!!-/2019/09/04/006/n/1922398/fe7006935d7044366c8982.50946989_/i/Rihanna.jpg",
        },
      ],
    };
  }

  render() {
    return (
      // The parent element of this component must be a Row element
      <Row className="no-gutters bioAndPhoto">
        <Col xs={12} lg={6} className="flex">
          <Carousel className="carousel" interval={null}>
            {this.state.matches.map((matchedUser, index) => {
              return (
                <Carousel.Item className="carouselItem">
                  <Image
                    className="d-block w-100 carouselImage"
                    src={matchedUser.imageLink}
                    alt={`Slide ${index + 1}`}
                    fluid
                  />
                  <Carousel.Caption>
                    <text className="borderLikeOrPass">PASS</text>
                    <text class="borderLikeOrPass">CONNECT</text>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Col>
        <Col xs={12} lg={6} className="bioContainer">
          <text class="name">Rihanna</text> <br></br>
          <text class="ageAndLocation">25</text>
          <img class="middleDot" src={dotIcon}></img>
          <img class="locationIcon" src={locationIcon}></img>
          <text class="ageAndLocation">Toronto, ON</text> <br></br>
          <text class="cancerType">Cancer Type: Prostate</text>
          <br></br>
          <br></br>
          <text class="bio">
            Most people that know me would say I am outgoing, spontaneous,
            funny and sometimes a little bit crazy.{'\n'} {'\n'}
            I am the type of woman who wears her heart on her sleeve. I truly
            am very passionate in a relationship and I am looking for someone who has
            the same values. I can be vulnerable and share my feelings easily. I am looking
            for someone who can do the same by opening up and who is able to express themselves.

          </text>
        </Col>
      </Row>
    );
  }
}

export default Matching;


// Fonts - I used Roboto
// Between Roboto light - Roboto medium
// Colors: #E74B1A and #C4C4C4
