const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const mongoose = require("mongoose")

const User = require('../models/user');

// this is the custom passport config file to sort information and establish login/out
module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({ email: email })
        .then(user => {
          if (!user) {
            return done(null, false);
          }
          
          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        });
    })
  );

  passport.serializeUser(function (user, done) {
    console.log('user serialized')
    // console.log(user.id)
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      console.log("deserializeUser")
      done(err, user);
    });
  });
};
