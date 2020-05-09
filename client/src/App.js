import React, { Component } from "react"
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import history from './utils/history';
import API from "./utils/API"

import Nav from "./components/Nav";
import HomePage from "./pages/HomePage/HomePage";
import Articles from "./pages/Articles/articles";
import Market from './pages/Market';
import Login from './pages/Login';
import Register from './pages/Register';

class App extends Component {
  state = {
    user: {
      name: "test",
      password: "nothanks",
      stockData: [
        {
          name: "appdatatest1",
          quantity: "25",
          ticker: "PSM"
        }, {
          name: "appdatatest2",
          quantity: "25",
          ticker: "RPM"
        }, {
          name: "appdatatest3",
          quantity: "25",
          ticker: "PLM"
        },
      ]
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.user.name !== prevState.user.name) {
      this.setState({ user: this.state.user })
      console.log(this.state.user)
    }
  }

  userCallback(data) {
    this.setState({ user: data.user })
  }

  componentDidMount() {
    console.log("app mounted")
  }

  render() {
    return (
      <div>
        {/* <Nav /> */}
        <Router history={history}>
          <div>
            <nav className="navbar navbar-light">
              <a className="navbar-brand" id="brand" href="/">FauxFinance</a>

              <ul className="nav">
                <li className="nav-item active">
                  <Link to={"/articles"}>Articles</Link>
                </li>
                <li className="nav-item">
                  <Link to={"/market"}>Market</Link>
                </li>
                <li className="nav-item">
                  <Link to={"/login"}>Log In</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={API.logoutUser}>Log out</a>
                  {/* <Link onClick={API.logoutUser}>Log out</Link> */}
                </li>
                <li className="nav-item">
                  <Link to={"/register"}>Register</Link>
                </li>
              </ul>
            </nav>
            <br />
            <br />
            <Route exact path='/' component={HomePage} />
            <Route exact path='/articles' component={Articles} />
            <Route exact path='/market' render={(props) => <Market user={this.state.user} />} />
            <Route exact path='/login' render={() => <Login callback={this.userCallback.bind(this)} />} />
            <Route exact path='/register' component={Register} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;