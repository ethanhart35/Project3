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
  constructor(props) {
    super(props)
    const currentComponent = this
    this.state = {
      user: {
        _id: "",
        name: "Guest",
        worth: 0,
        stockData: []
      }
    }
  }

  // userCallback is passed as props into Login page, when login is sucessful it pulls user data into app so
  // the entire app can use the users data
  userLogin(data) {
    console.log(data)
    this.setState({ user: data.user })
  }
  // when userCallback uses setstate it automatically triggers this
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.user._id !== prevState.user._id) {
      this.setState({ user: this.state.user })
    }
  }

  userLogout() {
    var logout = {
      _id: "",
      name: "Guest",
      worth: 0,
      stockData: []
    }
    this.setState({ user: logout})
  }

  render() {
    return (
      <div className="minHeight">
        <Router>
          <div>
            <nav className="navbar navbar-light">
              <Link id="brand" to={"/"}>FauxFinance</Link>

              <ul className="nav">
                <li className="nav-item active">
                  <Link className="nav-link btn py-0" to={"/articles"}>Articles</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn  py-0" to={"/market"}>Market</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn  py-0" to={"/login"}>Log In</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link btn  py-0" onClick={API.logoutUser}>Log out</a>
                </li>
                {/* <li className="nav-item">
                    <a className="nav-link btn py-0" href="/profile">Profile</a>
                </li> */}
                {/* <li className="nav-item">
                  <a className="nav-link btn" onClick={this.userLogout}>Log out</a>
                </li> */}
                <li className="nav-item">
                  <Link className="nav-link btn py-0" to={"/register"}>Register</Link>
                </li>
              </ul>
            </nav>

            <div>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/articles' component={Articles} />
              <Route exact path='/market' render={(props) => <Market user={this.state.user} />} />
              <Route exact path='/login' render={() => <Login callback={this.userLogin.bind(this)} />} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/profile' component={Profile} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;