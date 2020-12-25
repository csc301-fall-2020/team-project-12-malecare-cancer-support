import React from "react";

// import "./App.css";

// import "bootstrap/dist/css/bootstrap.min.css";
// Use Sass instead of the line above, to allow overriding/adding to the
// bootstrap variables/classes
import "./App.scss";

// An introduction to react-bootstrap:
// https://react-bootstrap.github.io/getting-started/introduction/

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CookiesProvider, withCookies } from "react-cookie";

import Admin from "./components/Admin";
import HomePage from "./components/HomePage";
import Landing from "./components/Landing";
import Chats from "./components/Chats";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Registration from "./components/Registration";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";
import { CurUserContext } from "./curUserContext";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.userCookieName = "cancerchatUser";
    let currentUser = null;
    // If there was a previous login cookie, load currentUser from it
    const userCookie = this.props.cookies.get(this.userCookieName);
    // console.log("App.js constructor, userCookie:", userCookie);
    if (userCookie && userCookie.userId && userCookie.accessToken) {
      currentUser = {
        userId: userCookie.userId,
        accessToken: userCookie.accessToken,
      };
    }
    this.state = {
      currentUser: currentUser,
      contextValue: {
        // Set the value of the context object to be used thoughout the app.
        // The context object is stored in the App component's state, and is
        // used to store the current user's login state and some information
        // about the current user.
        getCurrentUser: () => {
          return this.state.currentUser;
        },
        // 'user' must contain properties 'userId' and 'accessToken';
        //'loginDuration' is in seconds
        setCurrentUser: (user, loginDuration) => {
          this.setState({ currentUser: user });
          // Create the cookie
          this.props.cookies.set(
            this.userCookieName,
            { userId: user.userId, accessToken: user.accessToken },
            { path: "/", maxAge: loginDuration }
          );
        },
        isLoggedIn: () => {
          return this.state.currentUser !== null;
        },
        logout: () => {
          this.setState({ currentUser: null });
          // Remove the cookie
          this.props.cookies.remove(this.userCookieName);
        },
      },
    };
  }

  render() {
    return (
      <div className="App">
        <CookiesProvider>
          <CurUserContext.Provider value={this.state.contextValue}>
            <BrowserRouter>
              <Switch>
                <Route exact path={["/", "/home"]}>
                  <HomePage />
                </Route>
                <Route exact path="/register">
                  <Registration />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
                {/* The admin route should be behind a login eventually */}
                <Route exact path="/admin">
                  <Admin />
                </Route>
                {/* The rest of the routes require login to access */}
                <PrivateRoute exact path="/landing" component={Landing} />
                <PrivateRoute exact path="/chats" component={Chats} />
                <PrivateRoute path="/chat/:id" component={Chat} />

                {/* 404 page for if the link is not valid */}
                <Route>
                  <NotFound />
                </Route>
              </Switch>
            </BrowserRouter>
          </CurUserContext.Provider>
        </CookiesProvider>
      </div>
    );
  }
}

export default withCookies(App);
