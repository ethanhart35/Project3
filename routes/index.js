// const router = require("express").Router();
// // const userController = require("../controllers/userController");
// const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// // get routes with forward auth routes

// // Login Page
// router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// // Register Page
// router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// // Market Page
// router.get('/articles', forwardAuthenticated, (req, res) => res.render('login'));

// // Article Page
// router.get('/market', ensureAuthenticated, (req, res) => res.render('register'));


// module.exports = router;