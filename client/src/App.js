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
    this.userLogin = this.userLogin.bind(this)
    this.userUpdate = this.userUpdate.bind(this)
    this.state = {
      user: {
        _id: "",
        name: "Guest",
        password: "",
        stockData: [],
        worth: 0
      }
    }
  }

  componentDidMount() {
    console.log(this.state.user)
  }

  // userCallback is passed as props into Login page, when login is sucessful it pulls user data into app so
  // the entire app can use the users data
  userLogin(data) {
    this.setState({ user: data.user })
  }

  // replaces exposed userdata in the frontend with static replacement
  userLogout(e) {
    e.preventDefault()
    var logout = {
      _id: "",
      name: "Guest",
      password: "",
      stockData: [],
      worth: 0
    }
    this.setState({ user: logout })
  }

  userUpdate(data) {
    this.setState({ user: data })
  }

  // when userLogin/logout uses setstate it automatically triggers this
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.user._id !== prevState.user._id) {
      this.setState({ user: this.state.user })
      console.log("user data set")
    }
    if(this.state.user.worth !== prevState.user.worth){
      this.setState({user: this.state.user})
      console.log("user data updated")
    }
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
                  <a className="nav-link btn  py-0" onClick={e => this.userLogout(e)}>Log out</a>
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
              <Route exact path='/market' render={(props) => <Market user={this.state.user} callback={this.userUpdate}/>} />
              <Route exact path='/login' render={() => <Login callback={this.userLogin} />} />
              <Route exact path='/register' component={Register} />
              {/* <Route exact path='/profile' component={Profile} /> */}
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;