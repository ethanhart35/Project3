import React from "react";
import Books from "./pages/Books";
import Nav from "./components/Nav";
import Graph from "./components/Graph";


function App() {
  return (
    <div>
      {/* <Nav />
      <Books /> */}
      <Graph />
    </div>
=======
import HomePage from "./pages/HomePage/HomePage";
import Articles from './pages/Articles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from './components/Nav';

function App() {
  return (

    <Router>
      <>
        <Nav /> //always going to show a nav component
        <Route exact path='/' component={HomePage} />
        <Route exact path="/articles" component={Articles} />
      </>
    </Router>

  );

}

export default App;
