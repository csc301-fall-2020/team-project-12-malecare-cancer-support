import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./style.css";

class HomePage extends React.Component {
  // componentDidMount = () => {
  //   const imgUrl = "./image.webp"
  //   document.body.style.backgroundImage = `url(${imgUrl})`
  // }

  render() {
    return (
      <div className="homeContainer">
        <div className="d-flex flex-row justify-content-center align-items-center">
          <div
            class="d-flex flex-column justify-content-center"
            style={{
              height: "100vh",
            }}
          >
            <div>
              <h1 className="title">CancerChat</h1>
            </div>
            <div>
              <Container fluid>
                <Row fluid>
                  <Col>
                    <Button variant="light" size="lg" href="/register" block>
                      Sign Up
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="outline-light"
                      size="lg"
                      href="/login"
                      block
                    >
                      Log In
                    </Button>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
