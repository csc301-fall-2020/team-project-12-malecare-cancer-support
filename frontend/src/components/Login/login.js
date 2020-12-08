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
      } else {
        // successfully logged in
        this.context.setCurrentUser({
          accessToken: responseData.accessToken,
          userId: responseData.userId,
        });
        if (formData.inputStayLoggedIn.checked) {
          // TODO: User wants to stay logged in
        }
        this.props.history.push("/landing");
      }
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
        <Toast
          show={this.state.showToast}
          className="matchingToast"
          onClose={() => this.setState({ showToast: false })}
        >
          <Toast.Header className="matchingToastHeader" />
          <Toast.Body>{this.state.toastText}</Toast.Body>
        </Toast>
        <h1 className="text-center m-5 text-customOrange">CancerChat</h1>
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
        <Link to="/register" className="d-block mx-auto text-center mt-4">
          Don't have an account? Sign up now!
        </Link>
      </div>
    );
  }
}
Login.contextType = CurUserContext;

export default withRouter(Login);
