module.exports = {
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
          console.log('authentication err')
        return next();
      }
      res.redirect('/login');
    },
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        console.log('authentication err')

        return next();
      }
      res.redirect('/login');      
    }
  };
  