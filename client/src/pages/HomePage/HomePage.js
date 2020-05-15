import React from 'react';
import Graph from "../../components/Graph";
import Jumbo from '../../components/Jumbotron'
// import StockNav from '../../components/StockNav';


function HomePage(props) {
    return <>
    <Jumbo/>
    <Graph />
    <div id='charts' style={{height:"100vh"}}>
    {/* <StockNav/> */}
       </div>
    </>
  }
  


export default HomePage