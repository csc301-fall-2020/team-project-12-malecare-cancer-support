import React from "react";
import "./login.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { CurUserContext } from "../../curUserContext";
import { login } from "../../actions/authentication";

/* Login page component */
class Login extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.redirect) {
      this.props.history.replace("/login");
    }
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
    const { response, errorMessage } = await login(payload);
    console.log(response);
    if (!response) {
      console.log("An error occurred: ", errorMessage);
    } else {
      // successfully logged in
      this.context.setCurrentUser({ accessToken: response.data.accessToken });
      if (formData.inputStayLoggedIn.checked) {
        // User wants to stay logged in
      }
      this.props.history.push("/landing");
    }
  };

  render() {
    const formLabelClasses = "h4 font-weight-normal";
    return (
      <div>
        <h2 className="text-center m-5">CancerChat</h2>
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
          <Form.Group controlId="inputStayLoggedIn">
            <Form.Check
              className={formLabelClasses}
              type="checkbox"
              label="Stay logged in"
              custom
            />
          </Form.Group>
          <Button size="lg" variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    );
  }
}
Login.contextType = CurUserContext;

export default Login;
