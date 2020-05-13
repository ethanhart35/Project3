const router = require("express").Router();
const stockController = require("../controllers/stockController");
const User = require("../models/user")

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

// router.route("/buy")
//     .post(stockController.buyStock)

// router.route("/sell")
//     .post(stockController.sellStock)

router.route("/vend")
    .post((req, res) => {
        console.log(req.body)
        const { name, price, id } = req.body
        User.findById(id).then(user => {
            console.log(user)
        })
    })

module.exports = router;
