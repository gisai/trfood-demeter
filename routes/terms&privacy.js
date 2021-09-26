var express = require('express');
var router = express.Router();
const {ensureAuthenticated, userAuthenticated} = require("../config/auth.js");

router.get('/terms&privacy', function(req, res, next) {
  res.render('terms&privacy');
});

router.get('/terms&privacylogin', ensureAuthenticated,function(req, res, next) {
  res.render('terms&privacylogin');
});

module.exports = router;