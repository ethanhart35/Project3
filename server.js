const express = require("express");
const request = require("request");
const cheerio = require("cheerio");
const axios = require("axios");
var mongojs = require("mongojs");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;


// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
  console.log("Database Error:", error);
});


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



//scrape nyt for articles
app.get('/api/scrape/', (req, res) => {
  
  axios.get("https://www.nytimes.com/topic/subject/finances").then(function (result) {
    var $ = cheerio.load(result.data);
    var titleObjArr = [];
    $(".css-ye6x8s").each(function () {
      var titleObj = {
        title: $(this).children().children().children().children("h2").text(),
        link: $(this).children().children().children("a").attr("href")
      }
      titleObjArr.push(titleObj);
    });
    res.json(titleObjArr);
  });
});




// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist"
);

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
