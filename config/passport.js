const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// Load User model
var app = require('../app');
var User = app.User;
var Product = app.Product;
module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        })
      })
      .catch((err)=> {console.log(err)})
    })

  );

  passport.findProduct = function(ID){
    Product.findOne({
      ID : ID
    }).then(product => {
      if (!product) {
        return done(null, false, { message: 'That product is not registered' });
      }
    })
  }

  passport.requireProfessions = function(professions){
    return function(req, res, next){
      if (req.user.professions === professions) next();
      else
        res.send(404);
    }

  }

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};