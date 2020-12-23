import React from 'react';
import './chats.css';
import io from "socket.io-client";
import {Container, Image, Row, Col, Text} from 'react-bootstrap';
import { CurUserContext } from "../../curUserContext";
import { withRouter } from "react-router-dom";
import { getConversations, getUser} from "../../actions/serverRequests";

const ENDPOINT = "http://localhost:5000";
let socket;
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
        const userId = this.context.getCurrentUser().userId
        const { responseData } = await getConversations(userId);
        this.updatePredicate();
        window.addEventListener("resize", this.updatePredicate);
        let userConversations = [];
        for (let conversation of responseData) {
            const otherId = this.otherId(conversation);
            const profileImage = await this.getUserProfileImage(otherId);
            userConversations.push({...conversation, profileImage});
        }
        this.setState((prev) => {return {...prev, conversations: userConversations }});

        socket = io(ENDPOINT);

        socket.emit("joinUserSocket", {userId});
    
        socket.on("sendMatch", async (data) => {
            console.log("new match added")
            this.addNewConversation({...data.conversation});
        });
    };

    addNewConversation = async (newConversation) => {
        const otherId = this.otherId(newConversation);
        const profileImage = await this.getUserProfileImage(otherId);
        this.setState((prev) => {
            let prevConversations = prev.conversations
            return {
                ...prev,
                conversations: [...prevConversations, {...newConversation, profileImage}]
            };
        })
    }

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
        socket.off();
    }

    handleClick = (conversation) => {
        const chatURI = '/chat/' + conversation._id;
        const otherUserName = conversation.userIdOne == this.context.getCurrentUser().userId ? conversation.userNameTwo : conversation.userNameOne;
        const currUserName = conversation.userIdOne == this.context.getCurrentUser().userId ? conversation.userNameOne : conversation.userNameTwo;
        const profileImage = conversation.profileImage;
        const {history} = this.props;
        history.push({
            pathname: chatURI,
            conversationData: {
                _id: conversation._id,
                currUserName,
                otherUserName,
                profileImage,
                conversationType: conversation.conversationType
            }
        });
    }

    otherName = (conversation) => {
        return conversation.userIdOne == this.context.getCurrentUser().userId ? conversation.userNameTwo : conversation.userNameOne;
    }

    otherId = (conversation) => {
        return conversation.userIdOne == this.context.getCurrentUser().userId ? conversation.userIdTwo : conversation.userIdOne;
    }

    getUserProfileImage = async (userId) => {
        const response = await getUser(userId);
        const data = response.responseData;
        const profileImage = data.user.profileImage;
        return profileImage;
    }

    render () {
        const isWide = this.state.isWide;
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
                                <Image src={conservation.profileImage} 
                                className="imgFluid"
                                roundedCircle
                                />
                                </Col>
                                <Col md={7}>
                                    <h3>{this.otherName(conservation)}</h3>
                                </Col>
                            </Row>
                            ) : (
                                <Image src={conservation.profileImage} 
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