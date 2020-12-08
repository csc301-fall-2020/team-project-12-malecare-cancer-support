import React from "react";
import "./chat.css";
import io from "socket.io-client";
import { BiExit } from "react-icons/bi";
import { withRouter } from "react-router-dom";
import { CurUserContext } from "../../curUserContext";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from '@material-ui/core/CircularProgress';

const ENDPOINT = "http://localhost:5000";
let socket;

var base64Icon =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAnUlEQVR42u3RQREAAAQAMP70j0sN57YKy66e4IwUIgQhQhAiBCFCECJEiBCECEGIEIQIQYgQhCBECEKEIEQIQoQgBCFCECIEIUIQIgQhCBGCECEIEYIQIQhBiBCECEGIEIQIQQhChCBECEKEIEQIQhAiBCFCECIEIUIQghAhCBGCECEIEYIQhAhBiBCECEGIEIQIESIEIUIQIgQh3y2QM3LZVgIpFAAAAABJRU5ErkJggg==";

class Chat extends React.Component {
  static contextType = CurUserContext;

  constructor(props) {
    super(props);
    this.messagesEnd = false
    this.loading = true;
    this.hasMore = true;
    this.state = {
      message: {
        author: "",
        content: "",
      },
      conversation: {
        _id: "",
        currUserName: "",
        otherUserName: "",
        conversationType: "",
        messages: [],
      },
    };
  }


  scrollToBottom = () => {
    console.log('scroll');
    if(this.messagesEnd && !this.loading) {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
  }
  

  setMessages = async (msgs, isNew) => {
    if (isNew) {
     await this.setState((prev) => {
        const old_msgs = this.state.conversation.messages;
        return {
          ...prev,
          conversation: {
            ...prev.conversation,
            messages: [...old_msgs, ...msgs],
          },
        };
      });
      this.scrollToBottom();
    } else {
      await this.setState((prev) => {
        const new_msgs = this.state.conversation.messages;
        return {
          ...prev,
          conversation: {
            ...prev.conversation,
            messages: [...msgs, ...new_msgs],
          },
        };
      });
    }
  };

  componentDidMount = async () => {
    const conversationData = this.props.location.conversationData;
    this.setState((prev) => {
      const messages = this.state.conversation.messages;
      console.log("currNamse mount", conversationData.currUserName);
      return {
        message: {
          author: conversationData.currUserName,
          content: "",
        },
        conversation: {
          messages,
          ...conversationData,
        },
      };
    });

    const conversationId = this.props.match.params.id;
    const userId = this.context.getCurrentUser().userId;
    socket = io(ENDPOINT);

    socket.emit("join", { conversationId, userId }, ({ error }) => {
      if (error) {
        alert(error);
      }
    });

    await socket.on("messages", (data) => {
      this.hasMore = data.areMessagesLeft;
      this.setMessages(data.messages, data.isNew);
    });

    this.scrollToBottom();
  };

  componentWillUnmount = () => {
    socket.off();
  };

  sendMessage = async (e) => {
    e.preventDefault();
    const { message } = this.state;
    if (message.content.trim()) {
      socket.emit("sendMessage", message, ({ error }) => {
        if (error) {
          alert("");
        } else {
          this.setMessage("");
        }
      });
    }
  };

  setMessage = (text) => {
    this.setState((prev) => {
      return {
        ...prev,
        message: {
          author: prev.message.author,
          content: text,
        },
      };
    });
  };

  handleBackButton = () => {
    const chatURI = "/chats-test";
    const { history } = this.props;
    history.push(chatURI);
  };

  isMessageByMe = (message) => {
    return this.state.conversation.currUserName == message.author;
  };

  isConversationDate = () => {
    return this.state.conversation.conversationType === "date";
  };

  fetchMoreData = async () => {
    if(this.hasMore) {
      this.loading = true;
        await socket.emit(
        "latestMessages",
        this.state.conversation.messages[0]._id,
        ({ error }) => {
            if (error) {
            alert("");
            }
      }
    );
        this.loading = false;
    }
  };



  getLoader = () => {
    if (this.isConversationDate) {
        return <CircularProgress />
    } else { 
        return <CircularProgress color="secondary" />
    }
  }

  isLastMessage = (length, i) => {
    if(length - 1 == i) {
        return (
          <div style={{ float:"left", clear: "both" }}
            ref={(el) => { this.messagesEnd = el; }}>
          </div>
        )
    } else {
      return null;
    }
  }

  render() {

    const loading = this.loading;
    let loader;
    if(!loading) {
        loader = null
    } else {
        loader = 
        ( <div style={{display: 'flex', justifyContent: 'center'}}>
                {this.getLoader()}
        </div>
       )

    }
    return (
      <div className="outerContainer">
        <div className="chatContainer">
          <div className="chatBar" 
        style={{background: this.isConversationDate() ? "#fe3c72" : "#2979FF"}}
          >
            <div className="leftChatContainer">
              <img
                className="img-fluid rounded-circle col-lg-2 col-md-3 col-6 col-xs-4 col-sm-4"
                src={base64Icon}
                alt="profile icon"
              />
              <h5>{this.state.conversation.otherUserName}</h5>
            </div>
            <div className="rightChatContainer">
              <a onClick={() => this.handleBackButton()}>
                <BiExit size={"3em"} color="white" />
              </a>
            </div>
          </div>

            <div
            id="scrollableDiv"
            style={{
              height: "85vh",
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
            >
          <InfiniteScroll
            dataLength={this.state.conversation.messages.length}
            next={this.fetchMoreData}
            style={{ display: 'flex', flexDirection: 'column' }} 
            inverse={true} //
            hasMore={this.hasMore}
            scrollableTarget="scrollableDiv"
            scrollThreshold={0.95}
            >
            {loader}
                {this.state.conversation.messages.map((message, i) => {
                  return (
                    <div key={i}>
                      <div
                        className={`my-1 d-flex flex-column ${
                          this.isMessageByMe(message)
                            ? "align-self-end align-items-end"
                            : "align-items-start"
                        }`}
                      >
                        <div
                          className={`messageContainer px-2 py-0 ${
                            this.isMessageByMe(message)
                              ? "text-white"
                              : "border"
                          }`}
                          style={{
                            backgroundColor:
                              this.isMessageByMe(message) &&
                              !this.isConversationDate()
                                ? "#2979FF"
                                : this.isMessageByMe(message)
                                ? "#fe3c72"
                                : "#F3F3F3",
                          }}
                        >
                          <p className="messageText">{message.content}</p>
                        </div>
                        <div
                          className={`text-muted small ${
                            this.isMessageByMe(message) ? "text-right" : ""
                          }`}
                        >
                          {this.isMessageByMe(message) ? "You" : message.author}
                        </div>
                      </div>
                      {this.isLastMessage(this.state.conversation.messages.length, i)}
                    </div>
                  );
                })}
            </InfiniteScroll>
            </div>

          <form className="form">                
            <input
              className="input"
              type="text"
              placeholder="Type your message..."
              value={this.state.message.content}
              onChange={(e) => this.setMessage(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" ? this.sendMessage(e) : null
              }
            />
            <button className="sendButton" 
            onClick={(e) => this.sendMessage(e)}
            style={{background: this.isConversationDate() ? "#fe3c72" : "2979FF" }}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Chat.contextType = CurUserContext;

export default withRouter(Chat);
