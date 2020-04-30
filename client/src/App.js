import React from "react"
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage/HomePage";
import Articles from "./pages/Articles/articles";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Market from './pages/Market';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div>
      <Nav /> 
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