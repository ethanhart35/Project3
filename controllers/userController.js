const User = require("../models/user")
const bcrypt = require("bcryptjs")
const passport = require('passport');

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
            return res.json(message)
        } else {
            User.findOne({ email: email })
                .then((user) => {
                    if (user) {
                        return res.json([{ msg: "User already exists" }])
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
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);
    },
    logout: function (req, res) {
        req.logout();
        req.flash('success_msg', 'You are logged out');
        res.redirect('/login');
    },
};
