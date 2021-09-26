var express = require('express');
var router = express.Router();
const {ensureAuthenticated} = require("../config/auth.js");

router.get('/contact', function(req, res, next) {
  res.render('contact', {page:'Contact', menuId:'Contact'});
});

router.get('/contactlogin', ensureAuthenticated, function(req, res, next) {
  res.render('contactlogin', {page:'Contact', menuId:'Contact'});
});

module.exports = router;
