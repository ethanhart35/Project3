import React from 'react';
import Jumbo from '../../components/Jumbotron'
import StockNav from '../../components/StockNav';
import Graph from "../../components/Graph";

function HomePage(props) {
    return <>
    <Jumbo/>
    
    <StockNav/>
    <Graph/>
    
    </>
  }
  


export default HomePage