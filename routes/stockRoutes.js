const router = require("express").Router();
const stockController = require("../controllers/stockController");

// // Matches with "/api/books"
// router.route("/")
//   .get(booksController.findAll)
//   .post(booksController.create);

// // Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);


router.route("/buy")
    .post(stockController.buyStock)

router.route("/sell")
    .post(stockController.sellStock)


module.exports = router;
