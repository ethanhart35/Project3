const express = require("express");
var mongojs = require("mongojs");
const mongoose = require("mongoose");
const passport = require('passport')
const authRoutes = require("./routes/authRoutes")
const stockRoutes = require("./routes/stockRoutes")
var axios = require("axios");
var cheerio = require("cheerio");
const app = express();
const PORT = process.env.PORT || 3001;

// Passport Config
// require('./config/passport')(passport);

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Route links for login/register auth and stock data
app.use("/auth", authRoutes);
app.use("/stocks", stockRoutes);

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/fauxfinancedata" , { useNewUrlParser: true , useUnifiedTopology: true}
);

// Start the API server
app.listen(PORT, function() {
  console.log(`Hosting on http://localhost:${PORT}/`);
});
