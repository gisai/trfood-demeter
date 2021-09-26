var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('forgotPass', {page:'ForgotPass', menuId:'ForgotPass'});
});

module.exports = router;