import React from 'react';
import Graph from "../../components/Graph";
import Jumbo from '../../components/Jumbotron'
import StockNav from '../../components/StockNav';
function HomePage(props) {
    return <>
    <Jumbo/>
    <Graph />
    <div id='charts' style={{height:"100vh"}}>
    {/* <StockNav/> */}
    <img src = "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i7RJ3Q.PUDCM/v2/1000x-1.png" style={{height:"90vh"}}/>
    </div>
    </>
  }
  


export default HomePage