import React from "react";
import "./login.css";

import { Redirect } from "react-router-dom";
import { login } from "../../actions/authentication";

/* Login page component */
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.props.history.push("/login");
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
    console.log("abc");
    console.log(errorMessage);
    
    if (!response) {
      console.log("An error occurred: ", errorMessage);
    } else {
      // successfully logged in
      this.props.app.setState({ currentUser: {accessToken: response.data.accessToken} });
      <Redirect to="/landing" />;
    }
  };

  render() {
    return (
      <div>
        <div>CancerChat</div>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <input
            className="login-input login-username"
            type="text"
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

export default Login;
