import React from "react";
import "./login.css";

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
Login.contextType = CurUserContext;

export default Login;
