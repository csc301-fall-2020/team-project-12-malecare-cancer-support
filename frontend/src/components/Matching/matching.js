import React from "react";
import "./matching.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";

class Matching extends React.Component {
  render() {
    return (
      // The parent element of this component must be a Row element
      <Row className="no-gutters bioAndPhoto">
        <Col xs={12} lg={6} className="flex">
          <Carousel className="carousel" interval={null}>
            <Carousel.Item className="carouselItem">
              <Image
                className="d-block w-100 carouselImage"
                src="https://images.pexels.com/photos/3226584/pexels-photo-3226584.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="First slide"
                fluid
              />
              <Carousel.Caption>
                <text className="borderLikeOrPass">PASS</text>
                <text class="borderLikeOrPass">CONNECT</text>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="carouselItem">
              <Image
                className="d-block w-100 carouselImage"
                src="https://www.liveabout.com/thmb/jyBQcDiXM_ysKfIHu88GvvW-20U=/1300x866/filters:no_upscale():max_bytes(150000):strip_icc()/loan-599c450a03f40200117e717a.jpg"
                alt="Second slide"
                fluid
              />
              <Carousel.Caption>
                <text className="borderLikeOrPass">PASS</text>
                <text class="borderLikeOrPass">CONNECT</text>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="carouselItem">
              <Image
                className="d-block w-100 carouselImage"
                src="https://i.ytimg.com/vi/3PjV1PQixGI/maxresdefault.jpg"
                alt="Third slide"
                fluid
              />
              <Carousel.Caption>
                <text className="borderLikeOrPass">PASS</text>
                <text class="borderLikeOrPass">CONNECT</text>
              </Carousel.Caption>
            </Carousel.Item>
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
