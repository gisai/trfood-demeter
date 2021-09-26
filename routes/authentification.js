var express = require('express');
var router = express.Router();
//DB
var app = require('../app');
var User = app.User;

var bcrypt = require('bcrypt');
const passport = require('passport');
//config
const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { name, surname, email, password, password2, company , professions} = req.body;
  let errors = [];

  console.log(' Name ' + name+ ' surname' + surname + ' email :' + email+ ' pass:' + password + ' TypeUser: ' + professions);

  if (!name || !surname || !email || !password || !password2 || !professions) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if(!company){
    company = email;
  }

  if (errors.length > 0) {
    res.render('register', {
      errors : errors,
      name: name,
      surname: surname,
      email: email,
      password: password,
      password2: password2,
      company: company,
      professions: professions})
  } else {
    User.findOne({ email: email }).exec((err,user) => {
      console.log(user);
      if (user) {
        errors.push({ msg: 'Email already exists' });
        render(res,errors,name,surname,email,password,password2, company,professions);

      } else {
        const newUser = new User({
          name: name,
          surname: surname,
          email: email,
          password: password,
          company: company,
          professions: professions
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then((value)=>{
                console.log(value)
                req.flash('success_msg','You have now registered!')
                res.redirect('/authentification/login');
            })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/index/indexlogin',
    failureRedirect: '/authentification/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/authentification/login');
});



module.exports = router;