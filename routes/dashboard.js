var express = require('express');
var router = express.Router();
const {ensureAuthenticated} = require("../config/auth.js");

router.get('/dashboard', function(req, res, next) {
  res.render('consumers', {page:'Consumers', menuId:'Consumers'});
});

router.get('/dashboardlogin',ensureAuthenticated, function(req, res, next) {
  res.render('dashboardlogin');
});

module.exports = router;