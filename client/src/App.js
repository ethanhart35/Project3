import React from "react"
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage/HomePage";
import Articles from './pages/Articles';
import Market from './pages/Market';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  return (
    <div>
      <Nav /> //always going to show a nav component
      <Router>
        <div className="pt-5">  
          <Route exact path='/' component={HomePage} />
          <Route exact path="/articles" component={Articles} />
          <Route exact path="/market" component={Market} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
        </div>
      </Router>
    </div>
  );

}

export default App;
