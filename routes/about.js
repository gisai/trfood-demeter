var express = require('express');
var router = express.Router();

const {ensureAuthenticated} = require("../config/auth.js");

router.get('/about', function(req, res, next) {
  res.render('about', {page:'About', menuId:'AboutUs'});
});

router.get('/aboutlogin', ensureAuthenticated,function(req, res, next) {
  res.render('aboutlogin', {page:'About', menuId:'AboutUs'});
});


module.exports = router;
