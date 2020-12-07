import React from 'react';
import './requests.css';
import {Card, Container, Button, Row, Col} from "react-bootstrap";
import SideBar from '../SideBar';
import {withRouter} from 'react-router-dom';


class Requests extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currId: '5fcddedd29ac153ba8182696',
            currName: 'Alexander',
            liked_by: [
                {
                    userName: "Alex",
                    userId: "s5",
                    bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    likeType: "date"
                },
                {
                    userName: "Ara",
                    userId: "s6",
                    bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    likeType: "mentor"
                }
            ]
        }

    }

    connect = (conUser) => {
        console.log(conUser);
        const updatedLikedBy = this.state.user.liked_by.filter((user) => user.userId != conUser.userId);
        this.state.setState((prev) => {
            return {
                ...prev,
                liked_by: updatedLikedBy
            }
        })
    }

  
    render () {
        return (
            <div>

                <SideBar/>

                <Container>
                {this.state.user.liked_by.map((user, i) => {
                    return (
                        <Row className='justify-content-md-center'>
                            <Col>
                                <Card className='md' key={i} className="text-center mx-auto my-2" style={{backgroundColor: "grey"}}>
                                    <Card.Header>{user.userName}</Card.Header>
                                    <Card.Body>
                                    <Card.Text>
                                        {user.bio}
                                    </Card.Text>
                                    <Button className="connectButton" style={{backgroundColor: user.likeType == "date" ? "#fe3c72" : "#2979FF" }} onClick={() => this.connect(user)}>Connect</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    )
                })}
                </Container>
            </div>
        );
    }
  }


  
export default withRouter(Requests);