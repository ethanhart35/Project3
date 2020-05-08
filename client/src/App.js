import React, { Component } from "react"
import { BrowserRouter as Router, Route } from 'react-router-dom';
import history from './utils/history';

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
      this.setState({user: this.state})
      console.log(this.state)
    }
  }

  userCallback(data) {
    console.log(data)
    // this.setState({ user: data.user })
    // console.log(this.state.user)
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Nav />
        <Router history={history}>
          <div className="pt-5 container">
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