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
              <Route exact path="/login">
                <Login />
              </Route>
              {/* The admin route should be behind a login eventually */}
              <Route exact path="/admin">
                <Admin />
              </Route>
              {/* The rest of the routes require login to access */}
              <PrivateRoute exact path="/landing" component={Landing}/>
              <PrivateRoute exact path="/chats" component={Chats}/>
              <PrivateRoute  path="/chat/:id" component={Chat}/>

              <Route>
                <NotFound/>
              </Route>
            </Switch>
          </BrowserRouter>
        </CurUserContext.Provider>
      </div>
    );
  }
}

export default App;
