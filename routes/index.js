const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require("../config/auth.js")

router.get('/index', function(req, res, next) {
  res.render('index', {page:'Home', menuId:'home'});
});

router.get('/indexlogin',ensureAuthenticated,(req,res)=>{
  console.log(req);
  res.render('indexlogin',{
    user: req.user
  });
})

router.get('/map', function(req, res, next) {
  res.render('map', {page:'Map', menuId:'map'});
});



module.exports = router;
