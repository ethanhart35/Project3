const User = require("../models/user")
const bcrypt = require("bcryptjs")
const passport = require('passport');

// const { forwardAuthenticated } = require('../config/auth');

// const localStrategy = require('passport-local').Strategy()
// const mongoose = require("mongoose")

module.exports = {

    register: function (req, res) {
        const { name, email, password1, password2 } = req.body
        let message = [];

        if (!name || !email || !password1 || !password2) {
            message.push({ msg: 'Please enter all fields' });
        }
        if (password1 != password2) {
            message.push({ msg: 'Passwords do not match' });
        }
        if (password1.length < 6) {
            message.push({ msg: 'Password must be at least 6 characters' });
        }
        if (message.length > 0) {
            res.json(message)
        } else {
            // final check to see if user email already used
            User.findOne({ email: email })
                .then((user) => {
                    if (user) {
                        res.json([{ msg: "User already exists" }])
                    } else {
                        const newUser = new User({
                            name: name,
                            email: email,
                            password: password1
                        });

                        bcrypt.genSalt(10, (err, salt) => {
                            if (err) throw err;
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) throw err;

                                newUser.password = hash;
                                newUser.save()
                                    .then(user => {
                                        console.log(user)
                                        res.json([{ msg: "You can now login" }])
                                    })
                                    .catch(err => console.log(err));
                            });
                        });

                    }
                })

        }
    },
    login: function (req, res, next) {
        const { email, password } = req.body
    
        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);
    },
    // passport.use(
    //     new localStrategy({ usernameField: 'email' }, (email, password, done) => {
    //         User.findOne({ email: email })
    //             .then(user => {
    //                 console.log(user)
    //                 // if (!user) return done(null);
    //                 // bcrypt.compare(password, user.userData.password, (err, isMatch) => {
    //                 //     if (err) throw err;
    //                 //     if(isMatch){
    //                 //     }else{
    //                 //     }
    //                 // })
    //             })
    //             .catch(err => console.log(err))
    //     })
    // )
    logout: function (req, res) {
        // req.logout();
        // req.flash('success_msg', 'You are logged out');
        // res.redirect('/login');
    },
};
