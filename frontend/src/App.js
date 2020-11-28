import React from "react";

import "./App.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

// Check out an intro to react-bootstrap:
// https://react-bootstrap.github.io/getting-started/introduction/

import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import Landing from "./components/Landing";
import Registration from "./components/Registration";

class App extends React.Component {
  constructor(props) {
    super(props);
    // checkSession(this);
    this.state = { currentUser: null };
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path={["/", "/login", "/register", "/landing"]}
            render={(props) => (
              <div className="App">
                {!this.state.currentUser ? (
                  <Login {...props} app={this} />
                ) : (
                  <Landing {...props} app={this} />
                )}
              </div>
            )}
          />
          {/* TEMPORARY ROUTES BELOW FOR DEVELOPMENT TESTING */}
          <Route
            exact
            path="/login-test"
            render={(props) => (
              <div className="App">
                <Login {...props} app={this} />
              </div>
            )}
          />
          <Route
            exact
            path="/registration-test"
            render={(props) => (
              <div className="App">
                <Registration {...props} app={this} />
              </div>
            )}
          />
          <Route
            exact
            path="/landing-test"
            render={(props) => (
              <div className="App">
                <Landing {...props} app={this} />
              </div>
            )}
          />
          <Route render={() => <div>404 Not found</div>} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
