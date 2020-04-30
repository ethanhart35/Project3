const db = require("../models");
const User = require("../models/user")
const bcrypt = require("bcryptjs")

module.exports = {
    //   findAll: function(req, res) {
    //     db.Book
    //       .find(req.query)
    //       .sort({ date: -1 })
    //       .then(dbModel => res.json(dbModel))
    //       .catch(err => res.status(422).json(err));
    //   },
    //   findById: function(req, res) {
    //     db.Book
    //       .findById(req.params.id)
    //       .then(dbModel => res.json(dbModel))
    //       .catch(err => res.status(422).json(err));
    //   },


    register: function (req, res) {
        const { name, email, password1, password2 } = req.body
        let errors = [];

        if (!name || !email || !password1 || !password2) {
            errors.push({ msg: 'Please enter all fields' });
        }
        if (password1 != password2) {
            errors.push({ msg: 'Passwords do not match' });
        }
        if (password1.length < 6) {
            errors.push({ msg: 'Password must be at least 6 characters' });
        }
        if (errors.length > 0) {

            // push this back to the frontend register page with messages
            console.log(errors)

        } else {
            // final check to see if user email already used
            db.User.findOne({ email: email })
                .then((user) => {
                    if (user) {

                        // needs frontend push to register page
                        console.log('user already exists')

                    } else {
                        const newUser = new User({
                            userData: {
                                name: name,
                                email: email,
                                password: password1
                            }
                        });

                        bcrypt.genSalt(10, (err, salt) => {
                            if (err) throw err;
                            bcrypt.hash(newUser.userData.password, salt, (err, hash) => {
                                if (err) throw err;

                                newUser.userData.password = hash;
                                newUser.save()
                                    .then(user => {
                                        //   req.flash(
                                        //     'success_msg',
                                        //     'You are now registered and can log in'
                                        //   );
                                        //   res.redirect('/users/login');
                                        console.log(user)
                                    })
                                    .catch(err => console.log(err));
                            });
                        });

                    }
                })

        }
    },
    // db.User
    //   .create(req.body)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));

    //   update: function(req, res) {
    //     db.Book
    //       .findOneAndUpdate({ _id: req.params.id }, req.body)
    //       .then(dbModel => res.json(dbModel))
    //       .catch(err => res.status(422).json(err));
    //   },
    //   remove: function(req, res) {
    //     db.Book
    //       .findById({ _id: req.params.id })
    //       .then(dbModel => dbModel.remove())
    //       .then(dbModel => res.json(dbModel))
    //       .catch(err => res.status(422).json(err));
    //   }
};
