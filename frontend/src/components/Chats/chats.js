import React from 'react';
import './chats.css';
import {Container, Image, Row, Col, Text} from 'react-bootstrap';
import { CurUserContext } from "../../curUserContext";
import { withRouter } from "react-router-dom";
import { getConversations} from "../../actions/serverRequests";

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAnUlEQVR42u3RQREAAAQAMP70j0sN57YKy66e4IwUIgQhQhAiBCFCECJEiBCECEGIEIQIQYgQhCBECEKEIEQIQoQgBCFCECIEIUIQIgQhCBGCECEIEYIQIQhBiBCECEGIEIQIQQhChCBECEKEIEQIQhAiBCFCECIEIUIQghAhCBGCECEIEYIQhAhBiBCECEGIEIQIESIEIUIQIgQh3y2QM3LZVgIpFAAAAABJRU5ErkJggg==';

class Chats extends React.Component {
    static contextType = CurUserContext;
    constructor(props) {
        super(props);
        this.state = {
            isWide: true,
            conversations: []
        } 
    }
    
    componentDidMount = async () => {
        const { responseData } = await getConversations(
          this.context.getCurrentUser().userId
        );
        const userConversations = responseData;
        this.updatePredicate();
        window.addEventListener("resize", this.updatePredicate);
        this.setState((prev) => {return {...prev, conversations: userConversations }});
      };

    updatePredicate = () => {
        const isWide = window.innerWidth > 768; 
        this.setState(prev => {
            return {
                ...prev,
                isWide,
            }
        })
    }

    componentWillUnmount = () => {
        window.removeEventListener("resize", this.updatePredicate);
    }

    handleClick = (conversation) => {
        const chatURI = '/chat/' + conversation._id;
        const otherUserName = conversation.userIdOne == this.context.getCurrentUser().userId ? conversation.userNameTwo : conversation.userNameOne;
        const currUserName = conversation.userIdOne == this.context.getCurrentUser().userId ? conversation.userNameOne : conversation.userNameTwo;
        const {history} = this.props;
        history.push({
            pathname: chatURI,
            conversationData: {
                _id: conversation._id,
                currUserName,
                otherUserName,
                conversationType: conversation.conversationType
            }
        });
    }

    otherName = (conversation) => {
        return conversation.userIdOne == this.context.getCurrentUser().userId ? conversation.userNameTwo : conversation.userNameOne;
    }

    render () {
        const isWide = this.state.isWide;
        console.log(isWide)
        return (
            <Container fluid className="my-2"> 
            {this.state.conversations.map((conservation) => {
                return (
                <Row className="my-1" >
                    <Col xs={12}>
                        {isWide ? (
                            <Row 
                            className="chatEntry" 
                            style={{backgroundColor: conservation.conversationType == 'date' ? "#fe3c72" : "#2979FF", color: 'white'}}
                            onClick={()=> this.handleClick(conservation)}
                            >
                                <Col md={5}>
                                <Image src={base64Icon} 
                                className="imgFluid"
                                roundedCircle
                                />
                                </Col>
                                <Col md={7}>
                                    <h3>{this.otherName(conservation)}</h3>
                                </Col>
                            </Row>
                            ) : (
                                <Image src={base64Icon} 
                                className="imgFluid mx-auto"
                                onClick={()=> this.handleClick(conservation)}
                                roundedCircle
                                style={{borderColor: conservation.conversationType == 'date' ? "#fe3c72" : "#2979FF", color: 'white', 
                                borderWidth: 3,
                                borderStyle: "solid"}}
                                />
                            )}

                    </Col>
                </Row>
                )
            })}
            </Container>
        );
    }
  }

  Chats.contextType = CurUserContext;
  
  export default withRouter(Chats);