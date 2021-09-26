var express = require('express');
var router = express.Router();
const {ensureAuthenticated} = require("../config/auth.js");

/*Route Farmers Page*/ 
router.get('/farmers', function(req, res, next) {
  res.render('farmers', {page:'Farmers', menuId:'Farmers'});
});

router.get('/farmerslogin', ensureAuthenticated, function(req, res, next) {
  res.render('farmerslogin', {page:'Farmers', menuId:'Farmers'});
});

/*Route Processing Page*/ 
router.get('/processing', function(req, res, next) {
    res.render('processing', {page:'Processing', menuId:'Processing'});
  });
  
  router.get('/processinglogin',ensureAuthenticated, function(req, res, next) {
    res.render('processinglogin', {page:'Processing', menuId:'Processing'});
  });

/*Route Markets Page*/ 
  router.get('/markets', function(req, res, next) {
    res.render('markets', {page:'Markets', menuId:'Markets'});
  });
  
  router.get('/marketslogin', ensureAuthenticated, function(req, res, next) {
    res.render('marketslogin', {page:'Markets', menuId:'Markets'});
  });

  /*Route FoodPrint Page*/ 
  router.get('/foodprint', function(req, res, next) {
    res.render('foodprint', {page:'Foodprint', menuId:'Foodprint'});
  });
  
  router.get('/foodprintlogin', ensureAuthenticated, function(req, res, next) {
    res.render('foodprintlogin', {page:'Foodprint', menuId:'Foodprint'});
  });

    /*Route Farm to Fork Page*/ 
    router.get('/farmToFork', function(req, res, next) {
      res.render('farmToFork', {page:'FarmToFork', menuId:'FarmToFork'});
    });
    
    router.get('/farmToForklogin', ensureAuthenticated, function(req, res, next) {
      res.render('farmToForklogin', {page:'FarmToFork', menuId:'FarmToFork'});
    });

  
    /*Route Food Groups Page*/ 
    router.get('/foodGroups', function(req, res, next) {
      res.render('foodGroups', {page:'FoodGroups', menuId:'FoodGroups'});
    });
    
    router.get('/foodGroupslogin', ensureAuthenticated, function(req, res, next) {
      res.render('foodGroupslogin', {page:'FoodGroups', menuId:'FoodGroups'});
    });

module.exports = router;