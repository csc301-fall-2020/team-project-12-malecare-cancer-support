import React from "react";
import "./chats.css";
import { Container, Image, Row, Col, Text } from "react-bootstrap";
import { CurUserContext } from "../../curUserContext";
import SideBar from "../SideBar";
import { withRouter } from "react-router-dom";
import { getConversations } from "../../actions/serverRequests";

var base64Icon =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAnUlEQVR42u3RQREAAAQAMP70j0sN57YKy66e4IwUIgQhQhAiBCFCECJEiBCECEGIEIQIQYgQhCBECEKEIEQIQoQgBCFCECIEIUIQIgQhCBGCECEIEYIQIQhBiBCECEGIEIQIQQhChCBECEKEIEQIQhAiBCFCECIEIUIQghAhCBGCECEIEYIQhAhBiBCECEGIEIQIESIEIUIQIgQh3y2QM3LZVgIpFAAAAABJRU5ErkJggg==";

class Chats extends React.Component {
  static contextType = CurUserContext;
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
    };
  }

  componentDidMount = async () => {
    console.log(this.context);
    const { responseData } = await getConversations(
      this.context.getCurrentUser().userId
    );
    const userConversations = responseData;
    console.log(userConversations);
    this.setState({ conversations: userConversations });
  };

  handleClick = (conversation) => {
    const chatURI = "/chat/" + conversation._id;
    const otherUserName =
      conversation.userIdOne == this.context.getCurrentUser().userId
        ? conversation.userNameTwo
        : conversation.userNameOne;
    const currUserName =
      conversation.userIdOne == this.context.getCurrentUser().userId
        ? conversation.userNameOne
        : conversation.userNameTwo;
    const { history } = this.props;
    console.log("currUserName", currUserName);
    history.push({
      pathname: chatURI,
      conversationData: {
        _id: conversation._id,
        currUserName,
        otherUserName,
        conversationType: conversation.conversationType,
      },
    });
  };

  otherName = (conversation) => {
    return conversation.userIdOne == this.context.getCurrentUser().userId
      ? conversation.userNameTwo
      : conversation.userNameOne;
  };

  render() {
    return (
      <div>
        <SideBar />
        <Container fluid>
          {this.state.conversations.map((conservation) => {
            return (
              <Row className="my-1">
                <Col xs={12} md={{ span: 8, offset: 2 }}>
                  <Row
                    className="chatEntry"
                    style={{
                      backgroundColor:
                        conservation.conversationType == "date"
                          ? "#fe3c72"
                          : "#2979FF",
                      color: "white",
                    }}
                    onClick={() => this.handleClick(conservation)}
                  >
                    <Col xs={2} md={{ span: 2 }}>
                      <Image src={base64Icon} fluid roundedCircle />
                    </Col>
                    <Col xs={10} md={{ span: 10 }}>
                      <h3>{this.otherName(conservation)}</h3>
                    </Col>
                  </Row>
                </Col>
              </Row>
            );
          })}
        </Container>
      </div>
    );
  }
}

Chats.contextType = CurUserContext;

export default withRouter(Chats);
