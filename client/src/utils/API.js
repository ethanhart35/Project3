import axios from "axios";
var cheerio = require("cheerio");

export default {
  getStocks: function (ticker) {

  },




  registerUser: function (data) {
    return axios.post("/auth/register", data)
  },
  loginUser: function (data) {
    return axios.post("/auth/login", data)
  },
  logoutUser: function () {
    console.log("logout click")
    return axios.post("/auth/logout")
  },
  // big API search for the graph, gives lots of data going back months/weeks/days
  graphStockSearch: function (ticker, time) {
    var key = "Y630EXU2OC7ZDZ1G"
    var stockDataString = "https://www.alphavantage.co/query?function=" + time + "&symbol=" + ticker + "&apikey=" + key

    return axios.get(stockDataString)
  },
  // small api search for company stock information, contains today/last weeks info and percentage changes in value
  // small but is called multible times concecutively with different tickers for market carosel
  // cant call multible times concecutivly, API key only allows 5 calls/min
  getStocks: function (ticker) {
    var key = "Y630EXU2OC7ZDZ1G"
    var dataString = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + ticker + "&apikey=" + key
    return axios.get(dataString)
  },
  // single use heavy data API search for detailed singular info
  getStock: function (ticker) {

  },
  searchStock: function (search) {
    var key = "Y630EXU2OC7ZDZ1G"
    var searchString = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + search + "&apikey=" + key
    return axios.get(searchString)
  },
  buyStock: function (data) {
    return axios.post("/stocks/buy", data)
  },
  sellStock: function (data) {
    return axios.post("/stocks/sell", data)
  },


  scrape: function () {
    return axios.get("/api/scrape");
  }
};