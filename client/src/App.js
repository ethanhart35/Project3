import React from "react";
import Nav from "./components/Nav";
import Graph from "./components/Graph";
import HomePage from "./pages/HomePage/HomePage";
import Articles from './pages/Articles';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div>
    <Nav /> //always going to show a nav component
    <Graph />
    <Router>
      <div>  
        <Route exact path='/' component={HomePage} />
        <Route exact path="/articles" component={Articles} />
<<<<<<< HEAD
        
      </>
=======
      </div>
>>>>>>> 1200ed0e3468577d868ce9e6a58fd6c52087bbf9
    </Router>
    </div>
  );

}

export default App;
