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

  handleSubmit = async (event) => {
    event.preventDefault();
    const formElements = event.target.children;
    const payload = {
      email: formElements.namedItem("email").value,
      password: formElements.namedItem("password").value,
    };
    const { response, errorMessage } = await login(payload);
    console.log(response);
    if (!response) {
      console.log("An error occurred: ", errorMessage);
    } else {
      // successfully logged in
      this.context.setCurrentUser({ accessToken: response.data.accessToken });
      this.props.history.push("/landing");
    }
  };

  render() {
    return (
      <div>
        <div>CancerChat</div>
        <Form>
          <Form.Group controlId="inputEmail">
            <Form.Label className="h4 font-weight-normal">Email address</Form.Label>
            <Form.Control size="lg" type="email" placeholder="Enter email" className="col-md-4 col-sm-6 col-10"/>
          </Form.Group>
          <Form.Group controlId="inputPassword">
            <Form.Label className="h4 font-weight-normal">Password (must be at least 6 characters)</Form.Label>
            <Form.Control size="lg" type="password" placeholder="Enter password" className="col-md-4 col-sm-6 col-10"/>
          </Form.Group>
          <Form.Group>
            <Form.Check className="h4 font-weight-normal" type="checkbox" id="staySignedIn" label="Stay signed in" custom />
          </Form.Group>
          <Button size="lg" variant="primary" type="submit">Login</Button>
        </Form>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label for="email">Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <input
            className="login-input login-username"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            className="login-input login-password"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <input className="login-submit" type="submit" value="Login" />
        </form>
      </div>
    );
  }
}
Login.contextType = CurUserContext;

export default Login;
