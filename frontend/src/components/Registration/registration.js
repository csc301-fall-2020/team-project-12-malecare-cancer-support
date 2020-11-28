import React from "react";
import "./registration.css";

/* Registration page component */
class Registration extends React.Component {
  render() {
    return (
      <div>
        <div>Join the CancerChat community</div>
        <form className="registration-form" onSubmit={this.handleSubmit}>
          <input
            className="registration-input registration-username"
            type="text"
            name="username"
            placeholder="Email"
            required
          />
          <input
            className="registration-input registration-password"
            type="password"
            name="password"
            placeholder="Password"
            minlength="6"
            required
          />
          <input className="registration-submit" type="submit" value="Next" />
        </form>
      </div>
    );
  }
}

export default Registration;
