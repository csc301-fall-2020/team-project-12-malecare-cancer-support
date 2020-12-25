import React from "react";
import "./chats.css";
import io from "socket.io-client";
import { Container, Image, Row, Col } from "react-bootstrap";
import { CurUserContext } from "../../curUserContext";
import { withRouter } from "react-router-dom";
import { getConversations, getUser } from "../../actions/serverRequests";
import SideBar from "../SideBar";

const ENDPOINT =
  process.env.REACT_APP_SERVER_BASE_URL || "http://localhost:5000";
let socket;
class Chats extends React.Component {
  static contextType = CurUserContext;
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
    };
  }

  componentDidMount = async () => {
    const userId = this.context.getCurrentUser().userId;
    const { responseData } = await getConversations(userId);
    let userConversations = [];
    for (let conversation of responseData) {
      const otherId = this.otherId(conversation);
      const profileImage = await this.getUserProfileImage(otherId);
      userConversations.push({ ...conversation, profileImage });
    }
    this.setState((prev) => {
      return { ...prev, conversations: userConversations };
    });

    socket = io(ENDPOINT);

    socket.emit("joinUserSocket", { userId });

    socket.on("sendMatch", async (data) => {
      console.log("new match added");
      this.addNewConversation({ ...data.conversation });
    });
  };

  addNewConversation = async (newConversation) => {
    const otherId = this.otherId(newConversation);
    const profileImage = await this.getUserProfileImage(otherId);
    this.setState((prev) => {
      let prevConversations = prev.conversations;
      return {
        ...prev,
        conversations: [
          ...prevConversations,
          { ...newConversation, profileImage },
        ],
      };
    });
  };

  componentWillUnmount = () => {
    socket.off();
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
    const profileImage = conversation.profileImage;
    const { history } = this.props;
    history.push({
      pathname: chatURI,
      conversationData: {
        _id: conversation._id,
        currUserName,
        otherUserName,
        profileImage,
        conversationType: conversation.conversationType,
      },
    });
  };

  otherName = (conversation) => {
    return conversation.userIdOne == this.context.getCurrentUser().userId
      ? conversation.userNameTwo
      : conversation.userNameOne;
  };

  otherId = (conversation) => {
    return conversation.userIdOne == this.context.getCurrentUser().userId
      ? conversation.userIdTwo
      : conversation.userIdOne;
  };

  getUserProfileImage = async (userId) => {
    const response = await getUser(
      this.context.getCurrentUser().accessToken,
      userId
    );
    const data = response.responseData;
    const profileImage = data.user.profileImage;
    return profileImage;
  };

  render() {
    return (
      <div>
        <SideBar />
        <Container>
          {this.state.conversations.map((conservation) => {
            return (
              <Row className="my-1">
                <Col xs={12}>
                  <Row
                    className="chatEntry"
                    style={{
                      backgroundColor:
                        conservation.conversationType == "date"
                          ? "#fce6df"
                          : "#2979FF",
                      color: "#e74b1a",
                    }}
                    onClick={() => this.handleClick(conservation)}
                  >
                    <Col xs={5}>
                      <Image
                        src={conservation.profileImage}
                        className="imgFluid"
                        roundedCircle
                      />
                    </Col>
                    <Col xs={7}>
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
