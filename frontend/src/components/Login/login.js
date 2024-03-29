import React from "react";
import "./login.css";

import { Link, withRouter } from "react-router-dom";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";

import { CurUserContext } from "../../curUserContext";
import { login } from "../../actions/serverRequests";

/* Login page component */
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      loginErrorMessage: "",
      showToast: false,
      toastText: "",
    };
  }

  componentDidMount() {
    if (this.context.isLoggedIn()) {
      // If user is already logged in, go to the landing page
      this.props.history.replace("/landing");
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const formData = e.target.elements;
    const payload = {
      email: formData.inputEmail.value,
      password: formData.inputPassword.value,
    };

    try {
      const { responseData, errorMessage } = await login(payload);
      // console.log(responseData);
      if (!responseData) {
        // Server response indicates error with the user login information
        this.setState({
          showAlert: true,
          loginErrorMessage: "An error occurred: " + errorMessage,
        });
        return;
      }
      // Successfully logged in
      const secondsInDay = 86400;
      // Default login duration of 3 days
      let cookieDuration = secondsInDay * 3;
      if (formData.inputStayLoggedIn.checked) {
        // User wants to stay logged in: make login duration 21 days
        cookieDuration = secondsInDay * 21;
      }
      this.context.setCurrentUser(
        {
          accessToken: responseData.accessToken,
          userId: responseData.userId,
        },
        cookieDuration
      );
      this.props.history.push("/landing");
    } catch (error) {
      this.setState({
        showToast: true,
        toastText:
          "We were unable to connect to the server," +
          " please make sure you have a working internet connection.",
      });
    }
  };

  render() {
    const formLabelClasses = "h4 font-weight-normal";
    return (
      <div>
        {/* A Toast to display error messages related to the user's internet
            connection, when necessary */}
        <Toast
          show={this.state.showToast}
          className="matchingToast"
          onClose={() => this.setState({ showToast: false })}
        >
          <Toast.Header className="matchingToastHeader" />
          <Toast.Body>{this.state.toastText}</Toast.Body>
        </Toast>
        <h1 className="text-center m-5 text-customOrange">CancerChat</h1>
        {/* Login form below uses React-bootstrap Form components */}
        <Form className="login-form mx-auto" onSubmit={this.handleSubmit}>
          <Form.Group controlId="inputEmail">
            <Form.Label className={formLabelClasses}>Email address</Form.Label>
            <Form.Control
              size="lg"
              type="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>
          <Form.Group controlId="inputPassword">
            <Form.Label className={formLabelClasses}>Password</Form.Label>
            <Form.Control
              size="lg"
              type="password"
              placeholder="Enter password"
              required
            />
          </Form.Group>
          <Form.Group controlId="inputStayLoggedIn" className="mt-4 mb-4">
            <Form.Check
              className={formLabelClasses}
              type="checkbox"
              label="Stay logged in"
              custom
            />
          </Form.Group>
          {/* The Alert below displays error messages returned by the server on
              an unsuccesful login attempt */}
          <Alert
            variant={"warning"}
            show={this.state.showAlert}
            dismissible
            onClose={() => this.setState({ showAlert: false })}
          >
            {this.state.loginErrorMessage}
          </Alert>
          <Button
            size="lg"
            variant="customOrange"
            type="submit"
            className="d-block mx-auto w-100 login-submit"
          >
            Login
          </Button>
        </Form>
        {/* Link to the registration page */}
        <Link to="/register" className="d-block mx-auto text-center mt-4">
          Don't have an account? Sign up now!
        </Link>
      </div>
    );
  }
}
Login.contextType = CurUserContext;

export default withRouter(Login);
