import React from "react";

// import "./App.css";

// import "bootstrap/dist/css/bootstrap.min.css";
// Use Sass instead of the line above, to allow overriding/adding to the
// bootstrap variables/classes
import "./App.scss";

// An introduction to react-bootstrap:
// https://react-bootstrap.github.io/getting-started/introduction/

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Admin from "./components/Admin";
import Chat from "./components/Chat";
import Chats from "./components/Chats";
import CheckLogin from "./components/CheckLogin";
import HomePage from "./components/HomePage";
import Landing from "./components/Landing";
import LikesAndMessages from "./components/LikesAndMessages";
import Login from "./components/Login";
import Matching from "./components/Matching";
import Menu from "./components/Menu";
import Registration from "./components/Registration";
import Requests from "./components/Requests";
import { CurUserContext } from "./curUserContext";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      contextValue: {
        // Set the value of the context object to be used thoughout the app.
        // The context object is stored in the App component's state, and is
        // used to store the current user's login state and some information
        // about the current user.
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
              <Route exact path={["/", "/home"]}>
                <HomePage />
              </Route>
              <Route exact path="/register">
                <Registration />
              </Route>
              {/* The rest of the routes require login to access */}
              <Route exact path="/landing">
                <CheckLogin requestedComponent={Landing} />
              </Route>

              {/* TEMPORARY ROUTES BELOW FOR DEVELOPMENT TESTING */}
              <Route exact path={["/login-test", "/login"]}>
                <Login />
              </Route>
              <Route exact path="/registration-test">
                <Registration />
              </Route>
              <Route exact path="/landing-test">
                <Landing />
              </Route>
              <Route exact path="/matching-test">
                <Matching />
              </Route>
              <Route exact path="/chats-test">
                <Chats />
              </Route>
              <Route exact path="/contacts-test">
                <Requests />
              </Route>
              <Route path="/chat/:id" component={Chat}></Route>
              <Route exact path="/menu-test">
                <Menu />
              </Route>
              <Route exact path="/likesAndMessages-test">
                <LikesAndMessages />
              </Route>
              <Route exact path="/admin-test">
                <Admin />
              </Route>
              <Route>
                <div>404 Not found</div>
              </Route>
            </Switch>
          </BrowserRouter>
        </CurUserContext.Provider>
      </div>
    );
  }
}

export default App;
