import axios from "axios";
var cheerio = require("cheerio");

export default {
  getStocks: function (ticker) {

  },
  getStock: function (ticker) {
    var key = "Y630EXU2OC7ZDZ1G"
    var dataString = "https://www.alphavantage.co/query?function=Time_Series_Daily&symbol=" + ticker + "&apikey=" + key
    return axios.get(dataString)
  },

  buyStock: function (data) {
    return axios.post("/stocks", data)
  },

  registerUser: function (data) {
    return axios.post("/auth/register", data)
  },
  loginUser: function (data) {
    return axios.post("/auth/login", data)
  },
  logoutUser: function () {
    return axios.post("/auth/logout")
  },

  graphStockSearch: function (ticker, time) {
    var key = "Y630EXU2OC7ZDZ1G"
    var stockDataString = "https://www.alphavantage.co/query?function=" + time + "&symbol=" + ticker + "&apikey=" + key

    return axios.get(stockDataString)
  },


  scrape: function () {
    return axios.get("/api/scrape");
  }
};