import React, { Component } from "react"
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import API from "./utils/API"

import HomePage from "./pages/HomePage/HomePage";
import Articles from "./pages/Articles/articles";
import Market from './pages/Market';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

class App extends Component {
  state = {
    user: {
      _id: "5eabab7fb333e718e4f0e8aa",
      name: "no",
      password: "password",
      stockData: []
    }
  }

  // userCallback is passed as props into Login page, when login is sucessful it pulls user data into app so
  // the entire app can use the users data
  userCallback(data) {
    this.setState({ user: data.user })
  }
  // when userCallback uses setstate it automatically triggers this
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.user.name !== prevState.user.name) {
      this.setState({ user: this.state.user })
    }
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-light">
              <Link to={"/"}>FauxFinance</Link>

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
                  <a className="nav-link btn" onClick={API.logoutUser}>Log out</a>
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
            <Route exact path='/profile'component={Profile} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;