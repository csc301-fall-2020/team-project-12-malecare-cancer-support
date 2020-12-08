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
import Requests from './components/Requests';
import Chat from './components/Chat';
import Chats from './components/Chats';
import Menu from './components/Menu';

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
              <Route exact path={["/", "/login"]}>
                <Login />
              </Route>
              <Route exact path="/register">
                <Registration />
              </Route>
              {/* The rest of the routes require login to access */}
              <Route exact path="/landing">
                <CheckLogin requestedComponent={Landing} />
              </Route>

              {/* TEMPORARY ROUTES BELOW FOR DEVELOPMENT TESTING */}
              <Route exact path="/login-test">
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
                <Chats/>
              </Route>
              <Route exact path='/contacts-test'>
                <Requests/>
              </Route>
              <Route path='/chat/:id' component={Chat}>
              </Route>
              <Route exact path="/menu-test">
                <Menu />
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
