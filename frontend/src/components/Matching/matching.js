import React from "react";
import "./matching.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";

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
          <text class="bio">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            faucibus nec quam non viverra. Vivamus ultrices augue a velit
            ullamcorper placerat. Ut vel lectus tortor. Vestibulum consequat dui
            a condimentum pulvinar. Vestibulum ac congue mi. Sed iaculis luctus
            placerat. Sed nec mauris condimentum, lobortis purus et, bibendum
            ex. Mauris scelerisque rhoncus quam, et lobortis libero dictum sit
            amet. Vivamus scelerisque est sem, a elementum est bibendum et.
            Aenean sit amet ornare arcu. Aliquam id enim neque. Nulla blandit,
            enim vitae dignissim sagittis, sapien nisl finibus diam, ac
            convallis nisi arcu ut lorem. Curabitur viverra a urna non faucibus.
            Mauris eu enim mattis, commodo nibh non, posuere felis. Nulla
            facilisi. Proin sagittis neque a ligula efficitur, vel malesuada
            massa commodo. Phasellus iaculis, sem ut auctor sollicitudin, elit
            risus dictum quam, et volutpat augue lacus ut lectus. Mauris
            dignissim pretium fermentum. Morbi fermentum erat ac velit tincidunt
            sollicitudin. Donec gravida ipsum elit, at luctus massa aliquam sed.
            Ut tristique magna vitae magna consectetur, sed congue leo
            consectetur. Quisque in viverra justo. Etiam vestibulum dolor eu
            odio suscipit, ac sodales augue tincidunt. Proin porta, purus non
            hendrerit volutpat, lacus eros gravida sapien, nec aliquam sapien
            quam fringilla lectus. Nullam non mauris nibh. Suspendisse efficitur
            eros non turpis vestibulum commodo. Donec venenatis neque vel
            dapibus efficitur.
          </text>
          Row
        </Col>
      </Row>
    );
  }
}

export default Matching;


// Fonts - I used Roboto
// Between Roboto light - Roboto medium
// Colors: #E74B1A and #C4C4C4
