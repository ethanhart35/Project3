import React from 'react';
import Nav from '../../components/Nav';
import API from '../../utils/API';

// var cheerio = require("cheerio");
var axios = require("axios");
var results=[];
// axios.get("https://www.nytimes.com/topic/subject/finances")
// .then(function(response){
//     var $ = cheerio.load(response.data);

//     $("body").each(function(i, element){
//         var title = $(element).children("h2").text();
//         var link = $(element).find("a");

//         results.push({
//             title: title,
//             link: link
//         });
//     });
//     console.log(results);
// });

API.scrape()
    // console.load(response)








function Articles(props){
    return <div>
        <Nav/>
        <br/>
        <br/>
        <h1>Articles</h1>
    </div>
}

export default Articles