const router = require("express").Router();
const userController = require("../controllers/userController");

const auth = require("../config/auth")

router.route("/register")
    .post(userController.register)

router.route("/login")
    .post(userController.login)

router.route("/logout")
    .post(userController.logout)


module.exports = router;