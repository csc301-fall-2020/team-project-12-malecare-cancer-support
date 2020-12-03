import React from "react";

// import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// Use Sass to allow overriding/adding to the bootstrap variables/classes
import "./App.scss";

// Check out an intro to react-bootstrap:
// https://react-bootstrap.github.io/getting-started/introduction/

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { CurUserContext } from "./curUserContext";

import CheckLogin from "./components/CheckLogin";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Registration from "./components/Registration";
import Matching from "./components/Matching";

class App extends React.Component {
  constructor(props) {
    super(props);
    // checkSession(this);
    this.state = {
      currentUser: null,
      contextValue: {
        getCurrentUser: () => {
          return this.state.currentUser;
        },
        setCurrentUser: (user) => {
          this.setState({ currentUser: user });
        },
        isLoggedIn: () => {
          return this.state.currentUser !== null;
        },
        logout: () => {
          this.setState({ currentUser: null });
          this.props.history.push("/login");
        },
      },
    };
  }

  render() {
    return (
      <div className="App">
        <CurUserContext.Provider value={this.state.contextValue}>
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path={["/", "/login"]}
                render={(props) => (
                  <CheckLogin {...props} requestedComponent={Login} />
                )}
              />
              <Route
                exact
                path={"/register"}
                render={(props) => (
                  <CheckLogin {...props} requestedComponent={Registration} />
                )}
              />
              <Route
                exact
                path={"/landing"}
                render={(props) => (
                  <CheckLogin {...props} requestedComponent={Landing} />
                )}
              />
              {/* TEMPORARY ROUTES BELOW FOR DEVELOPMENT TESTING */}
              <Route
                exact
                path="/login-test"
                render={(props) => <Login {...props} />}
              />
              <Route
                exact
                path="/registration-test"
                render={(props) => <Registration {...props} />}
              />
              <Route
                exact
                path="/landing-test"
                render={(props) => <Landing {...props} />}
              />
              <Route
                exact
                path="/matching-test"
                render={(props) => <Matching {...props} />}
              />
              <Route render={() => <div>404 Not found</div>} />
            </Switch>
          </BrowserRouter>
        </CurUserContext.Provider>
      </div>
    );
  }
}

export default App;
