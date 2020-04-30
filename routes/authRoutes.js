const router = require("express").Router();
const userController = require("../controllers/userController");

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

router.route("/login")
    // .post(console.log(req.body))

router.route("/register")
    .post(userController.register)

router.route("/logout")
  

module.exports = router;