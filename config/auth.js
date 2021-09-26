module.exports = {
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/authentification/login');
    },
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/index/index');      
    },
    //No usado ahora mismo
    userAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()){
        if (req.user.professions == "farmer"){
          res.redirect('/farmers/farmerslogin');      
        }else if(req.user.professions == "agriHub"){
          res.redirect('/index/index');      
        }else if(req.user.professions == "foodMarket"){
          res.redirect('/index/index');      
        }else if(req.user.professions == "restaurant"){
          res.redirect('/markets/marketslogin');      
        }else{
          res.redirect('/markets/marketslogin');   
        }
      }
      res.redirect('/authentication/login'); 
    }
    /*isAlreadyAuthenticated: function(req, res, next){
      if(req.isAuthenticated()){
        return next();
      }
      
      res.redirect('/identifier/identifier');    
    }*/
  };