const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const mongoose = require("mongoose")

const User = require('../models/user');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({ email: email })
        .then(user => {
          if (!user) {
            console.log("null user")
            return done(null, false);
          }
          
          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              console.log("user match! login needed")
              return done(null, user);
            } else {
              console.log("incorrect match")
              return done(null, false);
            }
          });
        });
    })
  );

  passport.serializeUser(function (user, done) {
    console.log('user serialized')
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      console.log("deserializeUser")
      done(err, user);
    });
  });
};
