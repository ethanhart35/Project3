import axios from "axios";
var cheerio = require("cheerio");
export default {
  // // Gets all books
  // getBooks: function () {
  //   return axios.get("/api/books");
  // },
  // // Gets the book with the given id
  // getBook: function (id) {
  //   return axios.get("/api/books/" + id);
  // },
  // // Deletes the book with the given id
  // deleteBook: function (id) {
  //   return axios.delete("/api/books/" + id);
  // },
  // // Saves a book to the database
  // saveBook: function (bookData) {
  //   return axios.post("/api/books", bookData);
  // },

  // ===========================================================
  getStocks: function () {
    return axios.get("/stocks")
  },
  getStock: function (id) {
    return axios.get("/stocks/"+id)
  },
  registerUser: function () {
    // return axios.get("/auth/"+          )
  },
  loginUser: function () {
    // return axios.get("/auth/"+          )
  },

  searchStock: function (time, company) {
    var key = "Y630EXU2OC7ZDZ1G"
    var stockDataString = "https://www.alphavantage.co/query?function=" + time + "&symbol=" + company + "&apikey=" + key

    return axios.get(stockDataString)
  },


  scrape: function (res) {
    axios.get("https://www.nytimes.com/topic/subject/finances")
      .then(function (response) {
        var $ = cheerio.load(response.data);
        var results = [];
        $("body").each(function (i, element) {
          var title = $(element).children("h2").text();
          var link = $(element).find("a");

          results.push({
            title: title,
            link: link
          });
        });
        console.log(results);
      });
  }
};