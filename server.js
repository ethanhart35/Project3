const express = require("express");
const session = require('express-session');
const mongojs = require("mongojs");
const mongoose = require("mongoose");
const passport = require('passport')
const authRoutes = require("./routes/authRoutes")
const stockRoutes = require("./routes/stockRoutes")
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
const PORT = process.env.PORT || 3001;

// Passport Config
require('./config/passport')(passport);

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express/passport user cookie/session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

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
