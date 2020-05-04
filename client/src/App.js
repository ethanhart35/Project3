import React, { Component } from "react"
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage/HomePage";
import Articles from "./pages/Articles/articles";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Market from './pages/Market';
import Login from './pages/Login';
import Register from './pages/Register';

class App extends Component {
  state = {
    user: {
      name: "test",
      password: "nothanks",
      stocks: [
        {
          name: "appdatatest",
          quantity: "25",
          ticker: "PSM"
        },        {
          name: "appdatatest",
          quantity: "25",
          ticker: "PSM"
        },        {
          name: "appdatatest",
          quantity: "25",
          ticker: "PSM"
        },
      ]
    }
  }

  componentDidMount(){

  }

  render() {
    return (
      <div>
        <Nav />
        <Router>
          <div className="pt-5">
            <Route exact path='/' component={HomePage} />
            <Route exact path='/articles' component={Articles} />
            <Route exact path='/market' render={(props) => <Market user={this.state.user} />} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;