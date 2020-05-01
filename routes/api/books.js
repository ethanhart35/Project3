const router = require("express").Router();
const booksController = require("../../controllers/booksController");
const axios = require("axios")
const cheerio = require("cheerio")
// Matches with "/api/books"
router.route("/")
  .get(booksController.findAll)
  .post(booksController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove);

// router.route("/scrape")
//     axios.get("https://www.nytimes.com/topic/subject/finances")
//   .then(function(response){
//       var $ = cheerio.load(response.data);
//       var results=[];
//       $("body").each(function(i, element){
//           var title = $(element).children("h2").text();
//           var link = $(element).find("a");
          
//           results.push({
//               title: title,
//               link: link
//           });
//       });
//       console.log(results);
//   });

module.exports = router;
