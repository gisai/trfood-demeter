var express = require('express');
//collections
var app = require('../app');
var Product = app.Product;
//Food groups
var group1 = app.Group1;
var group2 = app.Group2;
var group3 = app.Group3;
var group4 = app.Group4;
var group5 = app.Group5;
var group6 = app.Group6;
var group7 = app.Group7;
var food = app.Food;

var router = express.Router();
var datetime = new Date();
var QRCode = require('qrcode');
const {ensureAuthenticated} = require("../config/auth.js");


router.get('/identifier',function(req, res, next) {
  res.render('identifier', {page:'Identifier', menuId:'Identifier'});
});

router.get('/identifierlogin', ensureAuthenticated,function(req, res, next) {
  res.render('identifierlogin');
});

function permission(req, Product){
  i = 0;
  while(Product.permissions.length > i){
    console.log("Usuario: " + Product.permissions[i]);
    if(Product.permissions[i] == req.user.email){
      return true;
    }else {i++;}
  }
  return false;
}
router.post('/identifier', function(req,res,next){
  var {ID} = req.body;
  let errors = [];

  console.log('ID: ' + ID);

  if(!ID){
    errors.push({msg: 'Please enter the Identifier'});
  }

  //Redirect to the correct page to edit every product
  if (errors.length > 0) {
    res.render('identifier', {
      errors : errors,
      ID: ID })
  } else {
    //Product
    Product.findOne({ID: ID }).exec((err ,product) => {
      if(product){
      console.log(product);
      var length = product.status.length - 1;
      if(length > 1){
        length = length -1;
      }
      food.findOne({ID: product.bossID}).exec((err, product2) => {
        res.render('product', {
          product2: product2,
          product: product,
          latlngi: JSON.stringify(product.status[0].currentLocation),
          latlngf: JSON.stringify(product.status[length].currentLocation),
          length: Object.keys(product.status).length - 1
        });
      });

      }
      if(!product){
        Product.findOne({corporativeID: ID }).exec((err ,productc) => {
          if(productc){
            QRCode.toDataURL(productc.ID, function (err, url) {
            QRCode.toDataURL(productc.corporativeID, function (err, urlc) {
            res.render('corporativeproduct', {
              ID: productc.ID,
              bossID: productc.bossID,
              product: productc,
              length: Object.keys(productc.status).length - 1,
              qr: url,
              qrc: urlc
            });
            });
            });
         }
         if(!productc){
           //Group1
          group1.findOne({ID: ID }).exec((err ,Group1) => {
            if(Group1){
              var length = Group1.status.length - 1;
              if(length > 1){
                length = length -1;
              }
              food.findOne({ID: Group1.bossID}).exec((err, product2) => {
              res.render('group1p', {
                group12: product2,
                group1: Group1,
                latlngi: JSON.stringify(Group1.status[0].currentLocation),
                latlngf: JSON.stringify(Group1.status[length].currentLocation),
                length: Object.keys(Group1.status).length - 1
              });
              });
           }
           if(!Group1){
            group1.findOne({corporativeID: ID }).exec((err ,group1c) => {
              if(group1c){
                QRCode.toDataURL(group1c.ID, function (err, url) {
                  QRCode.toDataURL(group1c.corporativeID, function (err, urlc) {
                  res.render('corporativegroup1', {
                    ID: group1c.ID,
                    bossID: group1c.bossID,
                    group1: group1c,
                    length: Object.keys(group1c.status).length - 1,
                    qr: url,
                    qrc: urlc
                  });
                  });
                  });
             }
             if(!group1c){
               //Group2
              group2.findOne({ID: ID }).exec((err ,Group2) => {
                if(Group2){    
                var length = Group2.status.length - 1;
                if(length > 1){
                  length = length -1;
                }
                food.findOne({ID: Group2.bossID}).exec((err, product2) => {
                  res.render('group2p', {
                    group22: product2,
                    group2: Group2,
                    latlngi: JSON.stringify(Group2.status[0].currentLocation),
                    latlngf: JSON.stringify(Group2.status[length].currentLocation),
                    length: Object.keys(Group2.status).length - 1
                  });
                });
               }
               if(!Group2){
                group2.findOne({corporativeID: ID }).exec((err ,group2c) => {
                  if(group2c){
                    QRCode.toDataURL(group2c.ID, function (err, url) {
                      QRCode.toDataURL(group2c.corporativeID, function (err, urlc) {
                      res.render('corporativegroup2', {
                        ID: group2c.ID,
                        bossID: group2c.bossID,
                        group2: group2c,
                        length: Object.keys(group2c.status).length - 1,
                        qr: url,
                        qrc: urlc
                      });
                      });
                      });
                 }
                 if(!group2c){
                   //Group3
                  group3.findOne({ID: ID }).exec((err ,Group3) => {
                    if(Group3){
                      var length = Group3.status.length - 1;
                      if(length > 1){
                        length = length -1;
                      }
                      food.findOne({ID: Group3.bossID}).exec((err, product2) => {
                        res.render('group3p', {
                        group32: product2,
                        group3: Group3,
                        latlngi: JSON.stringify(Group3.status[0].currentLocation),
                        latlngf: JSON.stringify(Group3.status[length].currentLocation),
                        length: Object.keys(Group3.status).length - 1
                      });
                    });
                   }
                   if(!Group3){
                    group3.findOne({corporativeID: ID }).exec((err ,group3c) => {
                      if(group3c){
                        QRCode.toDataURL(group3c.ID, function (err, url) {
                          QRCode.toDataURL(group3c.corporativeID, function (err, urlc) {
                          res.render('corporativegroup3', {
                            ID: group3c.ID,
                            bossID: group3c.bossID,
                            group3: group3c,
                            length: Object.keys(group3c.status).length - 1,
                            qr: url,
                            qrc: urlc
                          });
                          });
                          });
                     }
                     if(!group3c){
                       //Group4
                      group4.findOne({ID: ID }).exec((err ,Group4) => {
                        if(Group4){
                          var length = Group4.status.length - 1;
                          if(length > 1){
                            length = length -1;
                          }
                          food.findOne({ID: Group4.bossID}).exec((err, product2) => {
                            res.render('group4p', {
                            group42: product2,
                            group4: Group4,
                            latlngi: JSON.stringify(Group4.status[0].currentLocation),
                            latlngf: JSON.stringify(Group4.status[length].currentLocation),
                            length: Object.keys(Group4.status).length - 1
                          });
                        });
                       }
                       if(!Group4){
                        group4.findOne({corporativeID: ID }).exec((err ,group4c) => {
                          if(group4c){
                            QRCode.toDataURL(group4c.ID, function (err, url) {
                              QRCode.toDataURL(group4c.corporativeID, function (err, urlc) {
                              res.render('corporativegroup4', {
                                ID: group4c.ID,
                                bossID: group4c.bossID,
                                group4: group4c,
                                length: Object.keys(group4c.status).length - 1,
                                qr: url,
                                qrc: urlc
                              });
                              });
                              });
                         }
                         if(!group4c){
                           //Group5
                          group5.findOne({ID: ID }).exec((err ,Group5) => {
                            if(Group5){
                              var length = Group5.status.length - 1;
                              if(length > 1){
                                length = length -1;
                              }
                              food.findOne({ID: Group5.bossID}).exec((err, product2) => {
                                res.render('group5p', {
                                group52: product2,
                                group5: Group5,
                                latlngi: JSON.stringify(Group5.status[0].currentLocation),
                                latlngf: JSON.stringify(Group5.status[length].currentLocation),
                                length: Object.keys(Group5.status).length - 1
                              });
                            });
                           }
                           if(!Group5){
                            group5.findOne({corporativeID: ID }).exec((err ,group5c) => {
                              if(group5c){
                                QRCode.toDataURL(group5c.ID, function (err, url) {
                                  QRCode.toDataURL(group5c.corporativeID, function (err, urlc) {
                                  res.render('corporativegroup5', {
                                    ID: group5c.ID,
                                    bossID: group5c.bossID,
                                    group5: group5c,
                                    length: Object.keys(group5c.status).length - 1,
                                    qr: url,
                                    qrc: urlc
                                  });
                                  });
                                  });
                             }
                             if(!group5c){
                               //Group6
                              group6.findOne({ID: ID }).exec((err ,Group6) => {
                                if(Group6){
                                  var length = Group6.status.length - 1;
                                  if(length > 1){
                                    length = length -1;
                                  }
                                  food.findOne({ID: Group6.bossID}).exec((err, product2) => {
                                    res.render('group6p', {
                                    group62: product2,
                                    group6: Group6,
                                    latlngi: JSON.stringify(Group6.status[0].currentLocation),
                                    latlngf: JSON.stringify(Group6.status[length].currentLocation),
                                    length: Object.keys(Group6.status).length - 1
                                  });
                                });
                               }
                               if(!Group6){
                                group6.findOne({corporativeID: ID }).exec((err ,group6c) => {
                                  if(group6c){
                                    QRCode.toDataURL(group6c.ID, function (err, url) {
                                      QRCode.toDataURL(group6c.corporativeID, function (err, urlc) {
                                      res.render('corporativegroup6', {
                                        ID: group6c.ID,
                                        bossID: group6c.bossID,
                                        group6: group6c,
                                        length: Object.keys(group6c.status).length - 1,
                                        qr: url,
                                        qrc: urlc
                                      });
                                      });
                                      });
                                 }
                                 if(!group6c){
                                   //Group7
                                  group7.findOne({ID: ID }).exec((err ,Group7) => {
                                    if(Group7){
                                      var length = Group7.status.length - 1;
                                      if(length > 1){
                                        length = length -1;
                                      }
                                      food.findOne({ID: Group7.bossID}).exec((err, product2) => {
                                        res.render('group7p', {
                                        group72: product2,
                                        group7: Group7,
                                        latlngi: JSON.stringify(Group7.status[0].currentLocation),
                                        latlngf: JSON.stringify(Group7.status[length].currentLocation),
                                        length: Object.keys(Group7.status).length - 1
                                      });
                                    });
                                   }
                                   if(!Group7){
                                    group7.findOne({corporativeID: ID }).exec((err ,group7c) => {
                                      if(group7c){
                                        QRCode.toDataURL(group7c.ID, function (err, url) {
                                          QRCode.toDataURL(group7c.corporativeID, function (err, urlc) {
                                          res.render('corporativegroup7', {
                                            ID: group7c.ID,
                                            bossID: group7c.bossID,
                                            group7: group7c,
                                            length: Object.keys(group7c.status).length - 1,
                                            qr: url,
                                            qrc: urlc
                                          });
                                          });
                                          });
                                     }
                                    });
                                   }
                                  });
                                 }
                                });
                               }
                              });
                             }
                            });
                           }
                          });
                         }
                        });
                       }
                      });
                     }
                    });
                   }
                  });
                 }
                });
               }
              });
             }
            });
           }
          });
         }
        });
      }
    });
  }
})

//Edit page with the corporative ID (QR)
router.post('/corporativeproduct', async(req, res) => {
  //Data
  var { ID, status,pollutionGenerated, person} = req.body;
  //errors
  let errors = [];
  //Status length value
  Product.findOne({ID: ID }).exec((err ,product) => {
    if (product) {
      length = product.status.length - 1;
    }
  });

  var myquery = {ID: ID};
  //If there are errors
  if (errors.length > 0) {
    res.render('corporativeproduct', {
      product: Product,
      errors : errors,
      ID: ID,
      pollutionGenerated: pollutionGenerated,
      status: [
        {ID: ID, status: status, responsible: person, pollutionGenerated: pollutionGenerated}
      ]})
  //If not
  } else {
    //It can not reach this part
    if(status == null || status == ""){
      if(pollutionGenerated != null && pollutionGenerated != ""){
        Product.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
        }
        console.log(doc);
        });
      }
    //Edit in the state selected
    }else if(status != null && status != ""){
      
      Product.findOne({ID: ID, "status.status": status}).exec((err, product) => {
        //If the status exist
        if(product){
          //Change total pollution from global variables and from the certain status
          if(pollutionGenerated != null && pollutionGenerated != ""){
            Product.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log(doc);
            });
      
            Product.findOneAndUpdate({ID: ID, "status.status": status}, {$set: {"status.$.pollutionGenerated": pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!" + err);
            }
            console.log(doc);
            });
           }
           var pollutionTransport = product.status[length].pollutionGeneratedTransport;
           var distanceTransport = product.status[length].distance;

           //We have to covert the distance and the pollution transport to 0 in the state, and in the global variable too
           Product.findOne(myquery).exec((err, product) => {

             var pollution = product.pollutionGeneratedTransport - pollutionTransport;
             var distance = product.distance - distanceTransport;

             Product.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: pollution}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });

             Product.findOneAndUpdate(myquery, {$set: {distance: distance}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });
           });

        }else{
          //Id status doesnt exist it creates a new status
          Product.findOneAndUpdate(myquery, {$push: {status: {ID: ID, status: status, responsible: person, pollutionGenerated: pollutionGenerated}}}, {returnOriginal: false}).exec((err ,doc) => {
            if (err) {
              console.log("Something wrong when updating data!");
          }
          console.log(doc);
          });

           //Search and update pollution
        if(pollutionGenerated != null && pollutionGenerated != ""){
          Product.findOne(myquery).exec(async (err, product) => {
            Product.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
                if (err) {
                  console.log("Something wrong when updating data!");
              }
              console.log(doc);
               });
          });
        }
        }
      })
        
  }
  //It doesn't need a promise. The sleep it's ok
  await sleep(150);

  req.flash('success_msg','UPDATED!');

  //To render the map page, it's important to search for the location of the procoduct
  Product.findOne({ID: ID}).exec((err,product) =>  {
    res.render('corporativeproductmap',{
      latlng: JSON.stringify(product.location),
      ID: ID
    });
  })
  }
});

//Map page
router.post('/corporativeproductmap', (req, res) => {
  //Variables from the ajax post
  var lat = req.body.lat;
  var lng = req.body.lng;
  var distance  = req.body.distance;
  var ID = req.body.ID;
  //Variable that we need
  var state, length, tdistance, co2, co2d;
  //Errors
  let errors = [];

  console.log('ID: ' + ID);

  //In case of error
  if (errors.length > 0) {
    res.render('corporativeproductmap', {
      location: [lng, lat]})
  } else {
    var myquery = {ID: ID};
    //Search for Group ID
    Product.findOne({ID: ID}).exec((err ,product) => {
      //Status length and calculations of distance and pollution from the map
      length = product.status.length - 1;
      tdistance = product.distance + distance;
      if(product.pollutionGeneratedTransport == null){
        product.pollutionGeneratedTransport = 0;
      }
      co2d = 0.001*distance*0.6368;
      co2 = product.pollutionGeneratedTransport + co2d;
      state = product.status[length].status;
    if(lat != null && lat != ""){
      //Add pollution transport to the global variable
      Product.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: co2}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add pollution transport to the state variable
        Product.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.pollutionGeneratedTransport": co2d}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
      //Add new location to the global variable
      Product.findOneAndUpdate(myquery, {$set: {location: [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add new distance to the global variable
        Product.findOneAndUpdate(myquery, {$set: {distance: tdistance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
          }
            console.log(doc);
          });
        //Add new location to the state variable
        Product.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.currentLocation": [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
        //Add new distance to the state variable
        Product.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.distance": distance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
        req.flash('success_msg','You have now registered the product!');
      }
    });
      //Time to render the page to add products in the case the actual product use another registered product in the platform
      res.render('corporativeproductadd',{
        ID: ID
      }); 
 }
});


//Add link between products in some way
router.post('/corporativeproductadd', async(req,res)=>{
  //Data from the form post
  var {ID, busqueda} = req.body;
  //Variable where the products found with the search input are stored.
  var products = new Array();
  var i = 0;
  if(busqueda == null || busqueda == ''){
    res.redirect('/index/index');
  }
    //Search a product with a name similar to the input
    food.find({name: new RegExp(busqueda, 'i')}).exec().then(async(product) => {
      //If it exist, the product is stored in the variable products
      await Promise.all(product.map(async (p) => {
        products[i] = p;
        i++;
      }))
      }).then(() => {
        //Time to render the page displaying the stored products
        res.render('corporativeproductshow', {
          product: products,
          ID: ID
        }); 
      }) 

})
//Show product page
router.post('/corporativeproductshow', async (req, res) => {
  //Data from the Ajax post
  var usePageProduct = req.body.usePageProduct;
  var ID = req.body.ID;
  var percentage = req.body.percentage;
  //variable to use when it's necessary 
  var myquery = {ID: ID};
  //variable of pollution
  var contamination = 0;
  Product.findOne(myquery).exec().then(async(product) => {
    contamination = contamination + product.pollutionGenerated;
  }).then(() => {
    //Time to search the product selected to link to the main product
    //Search product in food
    food.findOne({ID: usePageProduct}).exec((err, productn) => {
      //If it exist
      if(productn){
      //Data to add about the product selected
      var add = {ID: productn.ID, Name: productn.name};
      //Add product to the list of products
      Product.findOneAndUpdate(myquery, {$push: {usedProducts: add}}, {returnOriginal: false, upsert: true}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
      }
      console.log(doc);
      });
      //Change the amount of pollution in the main product
      contamination = contamination + (productn.pollutionGenerated * (percentage/100));
      Product.findOneAndUpdate(myquery, {$set: {pollutionGenerated: contamination}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
      }
      console.log(doc);
      });
      //If it doesn't exist
    }else{
      console.log('No hay producto');
    }
    })
  })
})

//Edit page with the corporative ID (QR)
router.post('/corporativegroup1', async(req, res) => {
  //Data
  var { ID , status,pollutionGenerated, person} = req.body;
  //errors
  let errors = [];
  //Status length value
  await group1.findOne({ID: ID }).exec((err ,product) => {
    if (product) {
      length = product.status.length - 1;
    }
  });

  var myquery = {ID: ID};
  //If there are errors
  if (errors.length > 0) {
    res.render('corporativegroup1', {
      product: Product,
      errors : errors,
      ID: ID,
      pollutionGenerated: pollutionGenerated,
      status: [
        {ID: ID, status: status, responsible: person, pollutionGenerated: pollutionGenerated}
      ]})
  //If not
  } else {
    //It can not reach this part
    if(status == null || status == ""){
      if(pollutionGenerated != null && pollutionGenerated != ""){
        group1.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
        }
        console.log(doc);
        });
      }
    //Edit in the state selected
    }else if(status != null && status != ""){
      
      group1.findOne({ID: ID, "status.status": status}).exec((err, product) => {
        //If the status exist
        if(product){
          //Change total pollution from global variables and from the certain status
          if(pollutionGenerated != null && pollutionGenerated != ""){
            group1.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log(doc);
            });
      
            group1.findOneAndUpdate({ID: ID, "status.status": status}, {$set: {"status.$.pollutionGenerated": pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!" + err);
            }
            console.log(doc);
            });
           }
           var pollutionTransport = product.status[length].pollutionGeneratedTransport;
           var distanceTransport = product.status[length].distance;

           //We have to covert the distance and the pollution transport to 0 in the state, and in the global variable too
           group1.findOne(myquery).exec((err, product) => {

             var pollution = product.pollutionGeneratedTransport - pollutionTransport;
             var distance = product.distance - distanceTransport;

             group1.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: pollution}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });

             group1.findOneAndUpdate(myquery, {$set: {distance: distance}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });
           });



        }else{
          //Id status doesnt exist it creates a new status
          group1.findOneAndUpdate(myquery, {$push: {status: {ID: ID, status: status, responsible: person, pollutionGenerated: pollutionGenerated}}}, {returnOriginal: false}).exec((err ,doc) => {
            if (err) {
              console.log("Something wrong when updating data!");
          }
          console.log(doc);
          });

           //Search and update pollution
        if(pollutionGenerated != null && pollutionGenerated != ""){
          group1.findOne(myquery).exec((err, product) => {
               group1.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
                if (err) {
                  console.log("Something wrong when updating data!");
              }
              console.log(doc);
               });
          });
        }
        }
      })
        
  }
  //It doesn't need a promise. The sleep it's ok
  await sleep(150);

  req.flash('success_msg','UPDATED!');

  //To render the map page, it's important to search for the location of the procoduct
  await group1.findOne({ID: ID}).exec((err,product) =>  {
    res.render('corporativegroup1map',{
      latlng: JSON.stringify(product.location),
      ID: ID
    });
  })
  }
});

//Map page
router.post('/corporativegroup1map', (req, res) => {
  //Variables from the ajax post
  var lat = req.body.lat;
  var lng = req.body.lng;
  var distance  = req.body.distance;
  var ID = req.body.ID;
  //Variable that we need
  var state, length, tdistance, co2, co2d;
  //Errors
  let errors = [];

  //In case of error
  if (errors.length > 0) {
    res.render('corporativegroup1map', {
      location: [lng, lat]})
  } else {
    var myquery = {ID: ID};
    //Search for Group ID
    group1.findOne({ID: ID}).exec((err ,product) => {
      //Status length and calculations of distance and pollution from the map
      length = product.status.length - 1;
      tdistance = product.distance + distance;
      if(product.pollutionGeneratedTransport == null){
        product.pollutionGeneratedTransport = 0;
      }
      co2d = 0.001*distance*0.6368;
      co2 = product.pollutionGeneratedTransport + co2d;
      state = product.status[length].status;
    if(lat != null && lat != ""){
      //Add pollution transport to the global variable
      group1.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: co2}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add pollution transport to the state variable
        group1.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.pollutionGeneratedTransport": co2d}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
      //Add new location to the global variable
      group1.findOneAndUpdate(myquery, {$set: {location: [lng, lat]}}, {returnOriginal: false}).exec((err ,doc)=> {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add new distance to the global variable
        group1.findOneAndUpdate(myquery, {$set: {distance: tdistance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
          }
            console.log(doc);
          });
        //Add new location to the state variable
        group1.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.currentLocation": [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
        //Add new distance to the state variable
        group1.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.distance": distance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
        req.flash('success_msg','You have now registered the product!');
      }
    });
 }
});

//Edit page with the corporative ID (QR)
router.post('/corporativegroup2', async(req, res) => {
  //Data
  var { ID , status, pollutionGenerated, person} = req.body;
  //errors
  let errors = [];
  //Status length value
  group2.findOne({ID: ID }).exec((err ,product) => {
    if (product) {
      length = product.status.length - 1;
    }
  });

  var myquery = {ID: ID};
  //If there are errors
  if (errors.length > 0) {
    res.render('corporativegroup2', {
      product: Product,
      errors : errors,
      ID: ID,
      pollutionGenerated: pollutionGenerated,
      status: [
        {ID: ID, status: status, responsible: person, pollutionGenerated: pollutionGenerated}
      ]})
  //If not
  } else {
    //It can not reach this part
    if(status == null || status == ""){
      if(pollutionGenerated != null && pollutionGenerated != ""){
        group2.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
        }
        console.log(doc);
        });
      }
    //Edit in the state selected
    }else if(status != null && status != ""){
      
      group2.findOne({ID: ID, "status.status": status}).exec((err, product) => {
        //If the status exist
        if(product){
          //Change total pollution from global variables and from the certain status
          if(pollutionGenerated != null && pollutionGenerated != ""){
            group2.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log(doc);
            });
      
            group2.findOneAndUpdate({ID: ID, "status.status": status}, {$set: {"status.$.pollutionGenerated": pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!" + err);
            }
            console.log(doc);
            });
           }
           var pollutionTransport = product.status[length].pollutionGeneratedTransport;
           var distanceTransport = product.status[length].distance;

           //We have to covert the distance and the pollution transport to 0 in the state, and in the global variable too
           group2.findOne(myquery).exec((err, product) => {

             var pollution = product.pollutionGeneratedTransport - pollutionTransport;
             var distance = product.distance - distanceTransport;

             group2.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: pollution}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });

             group2.findOneAndUpdate(myquery, {$set: {distance: distance}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });
           });



        }else{
          //Id status doesnt exist it creates a new status
          group2.findOneAndUpdate(myquery, {$push: {status: {ID: ID, status: status, responsible: person, pollutionGenerated: pollutionGenerated}}}, {returnOriginal: false}).exec((err ,doc) => {
            if (err) {
              console.log("Something wrong when updating data!");
          }
          console.log(doc);
          });

           //Search and update pollution
        if(pollutionGenerated != null && pollutionGenerated != ""){
          group2.findOne(myquery).exec((err, product) => {
               group2.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
                if (err) {
                  console.log("Something wrong when updating data!");
              }
              console.log(doc);
               });
          });
        }
        }
      })
        
  }
  //It doesn't need a promise. The sleep it's ok
  await sleep(150);

  req.flash('success_msg','UPDATED!');

  //To render the map page, it's important to search for the location of the procoduct
  await group2.findOne({ID: ID}).exec((err,product) =>  {
    res.render('corporativegroup2map',{
      latlng: JSON.stringify(product.location),
      ID: ID
    });
  })
  }
});

//Map page
router.post('/corporativegroup2map', (req, res) => {
  //Variables from the ajax post
  var lat = req.body.lat;
  var lng = req.body.lng;
  var distance  = req.body.distance;
  var ID = req.body.ID;
  //Variable that we need
  var state, length, tdistance, co2, co2d;
  //Errors
  let errors = [];

  //In case of error
  if (errors.length > 0) {
    res.render('corporativegroup2map', {
      location: [lng, lat]})
  } else {
    var myquery = {ID: ID};
    //Search for Group ID
    group2.findOne({ID: ID}).exec((err ,product) => {
      //Status length and calculations of distance and pollution from the map
      length = product.status.length - 1;
      tdistance = product.distance + distance;
      if(product.pollutionGeneratedTransport == null){
        product.pollutionGeneratedTransport = 0;
      }
      co2d = 0.001*distance*0.6368;
      co2 = product.pollutionGeneratedTransport + co2d;
      state = product.status[length].status;
    if(lat != null && lat != ""){
      //Add pollution transport to the global variable
      group2.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: co2}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add pollution transport to the state variable
        group2.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.pollutionGeneratedTransport": co2d}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
      //Add new location to the global variable
      group2.findOneAndUpdate(myquery, {$set: {location: [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add new distance to the global variable
        group2.findOneAndUpdate(myquery, {$set: {distance: tdistance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
          }
            console.log(doc);
          });
        //Add new location to the state variable
        group2.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.currentLocation": [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
        //Add new distance to the state variable
        group2.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.distance": distance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
        req.flash('success_msg','You have now registered the product!');
      }
    });
 }
});


//Edit page with the corporative ID (QR)
router.post('/corporativegroup3', async(req, res) => {
  //Data
  var { ID , status, pollutionGenerated, person} = req.body;
  //errors
  let errors = [];
  //Status length value
  await group3.findOne({ID: ID }).exec((err ,product) => {
    if (product) {
      length = product.status.length - 1;
    }
  });

  var myquery = {ID: ID};
  //If there are errors
  if (errors.length > 0) {
    res.render('corporativegroup3', {
      product: Product,
      errors : errors,
      ID: ID,
      pollutionGenerated: pollutionGenerated,
      status: [
        {ID: ID, status: status, responsible: person, pollutionGenerated: pollutionGenerated}
      ]})
  //If not
  } else {
    //It can not reach this part
    if(status == null || status == ""){
      if(pollutionGenerated != null && pollutionGenerated != ""){
        group3.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
        }
        console.log(doc);
        });
      }
    //Edit in the state selected
    }else if(status != null && status != ""){
      
      group3.findOne({ID: ID, "status.status": status}).exec((err, product) => {
        //If the status exist
        if(product){
          //Change total pollution from global variables and from the certain status
          if(pollutionGenerated != null && pollutionGenerated != ""){
            group3.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log(doc);
            });
      
            group3.findOneAndUpdate({ID: ID, "status.status": status}, {$set: {"status.$.pollutionGenerated": pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!" + err);
            }
            console.log(doc);
            });
           }
           var pollutionTransport = product.status[length].pollutionGeneratedTransport;
           var distanceTransport = product.status[length].distance;

           //We have to covert the distance and the pollution transport to 0 in the state, and in the global variable too
           group3.findOne(myquery).exec((err, product) => {

             var pollution = product.pollutionGeneratedTransport - pollutionTransport;
             var distance = product.distance - distanceTransport;

             group3.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: pollution}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });

             group3.findOneAndUpdate(myquery, {$set: {distance: distance}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });
           });



        }else{
          //Id status doesnt exist it creates a new status
          group3.findOneAndUpdate(myquery, {$push: {status: {ID: ID, status: status, responsible: person, pollutionGenerated: pollutionGenerated}}}, {returnOriginal: false}).exec((err ,doc) => {
            if (err) {
              console.log("Something wrong when updating data!");
          }
          console.log(doc);
          });

           //Search and update pollution
        if(pollutionGenerated != null && pollutionGenerated != ""){
          group3.findOne(myquery).exec((err, product) => {
               group3.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
                if (err) {
                  console.log("Something wrong when updating data!");
              }
              console.log(doc);
               });
          });
        }
        }
      })
        
  }
  //It doesn't need a promise. The sleep it's ok
  await sleep(150);

  req.flash('success_msg','UPDATED!');

  //To render the map page, it's important to search for the location of the procoduct
  await group3.findOne({ID: ID}).exec((err,product) =>  {
    res.render('corporativegroup3map',{
      latlng: JSON.stringify(product.location),
      ID: ID
    });
  })
  }
});

//Map page
router.post('/corporativegroup3map', (req, res) => {
  //Variables from the ajax post
  var lat = req.body.lat;
  var lng = req.body.lng;
  var distance  = req.body.distance;
  var ID = req.body.ID;
  //Variable that we need
  var state, length, tdistance, co2, co2d;
  //Errors
  let errors = [];

  //In case of error
  if (errors.length > 0) {
    res.render('corporativegroup3map', {
      location: [lng, lat]})
  } else {
    var myquery = {ID: ID};
    //Search for Group ID
    group3.findOne({ID: ID}).exec((err ,product) => {
      //Status length and calculations of distance and pollution from the map
      length = product.status.length - 1;
      tdistance = product.distance + distance;
      if(product.pollutionGeneratedTransport == null){
        product.pollutionGeneratedTransport = 0;
      }
      co2d = 0.001*distance*0.6368;
      co2 = product.pollutionGeneratedTransport + co2d;
      state = product.status[length].status;
    if(lat != null && lat != ""){
      //Add pollution transport to the global variable
      group3.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: co2}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add pollution transport to the state variable
        group3.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.pollutionGeneratedTransport": co2d}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
      //Add new location to the global variable
      group3.findOneAndUpdate(myquery, {$set: {location: [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add new distance to the global variable
        group3.findOneAndUpdate(myquery, {$set: {distance: tdistance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
          }
            console.log(doc);
          });
        //Add new location to the state variable
        group3.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.currentLocation": [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
        //Add new distance to the state variable
        group3.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.distance": distance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
        req.flash('success_msg','You have now registered the product!');
      }
    });
 }
});

//Edit page with the corporative ID (QR)
router.post('/corporativegroup4', async(req, res) => {
  //Data
  var { ID , status, pollutionGenerated, person} = req.body;
  //errors
  let errors = [];
  //Status length value
  await group4.findOne({ID: ID }).exec((err ,product) => {
    if (product) {
      length = product.status.length - 1;
    }
  });

  var myquery = {ID: ID};
  //If there are errors
  if (errors.length > 0) {
    res.render('corporativegroup4', {
      product: Product,
      errors : errors,
      ID: ID,
      pollutionGenerated: pollutionGenerated,
      status: [
        {ID: ID, status: status, responsible: person, pollutionGenerated: pollutionGenerated}
      ]})
  //If not
  } else {
    //It can not reach this part
    if(status == null || status == ""){
      if(pollutionGenerated != null && pollutionGenerated != ""){
        group4.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
        }
        console.log(doc);
        });
      }
    //Edit in the state selected
    }else if(status != null && status != ""){
      
      group4.findOne({ID: ID, "status.status": status}).exec((err, product) => {
        //If the status exist
        if(product){
          //Change total pollution from global variables and from the certain status
          if(pollutionGenerated != null && pollutionGenerated != ""){
            group4.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log(doc);
            });
      
            group4.findOneAndUpdate({ID: ID, "status.status": status}, {$set: {"status.$.pollutionGenerated": pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!" + err);
            }
            console.log(doc);
            });
           }
           var pollutionTransport = product.status[length].pollutionGeneratedTransport;
           var distanceTransport = product.status[length].distance;

           //We have to covert the distance and the pollution transport to 0 in the state, and in the global variable too
           group4.findOne(myquery).exec((err, product) => {

             var pollution = product.pollutionGeneratedTransport - pollutionTransport;
             var distance = product.distance - distanceTransport;

             group4.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: pollution}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });

             group4.findOneAndUpdate(myquery, {$set: {distance: distance}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });
           });



        }else{
          //Id status doesnt exist it creates a new status
          group4.findOneAndUpdate(myquery, {$push: {status: {ID: ID, status: status, responsible: person, pollutionGenerated: pollutionGenerated}}}, {returnOriginal: false}).exec((err ,doc) => {
            if (err) {
              console.log("Something wrong when updating data!");
          }
          console.log(doc);
          });

           //Search and update pollution
        if(pollutionGenerated != null && pollutionGenerated != ""){
          group4.findOne(myquery).exec((err, product) => {
               group4.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
                if (err) {
                  console.log("Something wrong when updating data!");
              }
              console.log(doc);
               });
          });
        }
        }
      })
        
  }
  //It doesn't need a promise. The sleep it's ok
  await sleep(150);

  req.flash('success_msg','UPDATED!');

  //To render the map page, it's important to search for the location of the procoduct
  await group4.findOne({ID: ID}).exec((err,product) =>  {
    res.render('corporativegroup4map',{
      latlng: JSON.stringify(product.location),
      ID: ID
    });
  })
  }
});

//Map page
router.post('/corporativegroup4map', (req, res) => {
  //Variables from the ajax post
  var lat = req.body.lat;
  var lng = req.body.lng;
  var distance  = req.body.distance;
  var ID = req.body.ID;
  //Variable that we need
  var state, length, tdistance, co2, co2d;
  //Errors
  let errors = [];

  //In case of error
  if (errors.length > 0) {
    res.render('corporativegroup4map', {
      location: [lng, lat]})
  } else {
    var myquery = {ID: ID};
    //Search for Group ID
    group4.findOne({ID: ID}).exec((err ,product) => {
      //Status length and calculations of distance and pollution from the map
      length = product.status.length - 1;
      tdistance = product.distance + distance;
      if(product.pollutionGeneratedTransport == null){
        product.pollutionGeneratedTransport = 0;
      }
      co2d = 0.001*distance*0.6368;
      co2 = product.pollutionGeneratedTransport + co2d;
      state = product.status[length].status;
    if(lat != null && lat != ""){
      //Add pollution transport to the global variable
      group4.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: co2}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add pollution transport to the state variable
        group4.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.pollutionGeneratedTransport": co2d}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
      //Add new location to the global variable
      group4.findOneAndUpdate(myquery, {$set: {location: [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add new distance to the global variable
        group4.findOneAndUpdate(myquery, {$set: {distance: tdistance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
          }
            console.log(doc);
          });
        //Add new location to the state variable
        group4.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.currentLocation": [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
        //Add new distance to the state variable
        group4.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.distance": distance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
        req.flash('success_msg','You have now registered the product!');
      }
    });
 }
});
//Edit page with the corporative ID (QR)
router.post('/corporativegroup5', async(req, res) => {
  //Data
  var { ID , status, pollutionGenerated, person} = req.body;
  //errors
  let errors = [];
  //Status length value
  await group5.findOne({ID: ID }).exec((err ,product) => {
    if (product) {
      length = product.status.length - 1;
    }
  });

  var myquery = {ID: ID};
  //If there are errors
  if (errors.length > 0) {
    res.render('corporativegroup5', {
      product: Product,
      errors : errors,
      ID: ID,
      pollutionGenerated: pollutionGenerated,
      status: [
        {ID: ID, status: status, responsible: person, pollutionGenerated: pollutionGenerated}
      ]})
  //If not
  } else {
    //It can not reach this part
    if(status == null || status == ""){
      if(pollutionGenerated != null && pollutionGenerated != ""){
        group5.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
        }
        console.log(doc);
        });
      }
    //Edit in the state selected
    }else if(status != null && status != ""){
      
      group5.findOne({ID: ID, "status.status": status}).exec((err, product) => {
        //If the status exist
        if(product){
          //Change total pollution from global variables and from the certain status
          if(pollutionGenerated != null && pollutionGenerated != ""){
            group5.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log(doc);
            });
      
            group5.findOneAndUpdate({ID: ID, "status.status": status}, {$set: {"status.$.pollutionGenerated": pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!" + err);
            }
            console.log(doc);
            });
           }
           var pollutionTransport = product.status[length].pollutionGeneratedTransport;
           var distanceTransport = product.status[length].distance;

           //We have to covert the distance and the pollution transport to 0 in the state, and in the global variable too
           group5.findOne(myquery).exec((err, product) => {

             var pollution = product.pollutionGeneratedTransport - pollutionTransport;
             var distance = product.distance - distanceTransport;

             group5.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: pollution}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });

             group5.findOneAndUpdate(myquery, {$set: {distance: distance}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });
           });



        }else{
          //Id status doesnt exist it creates a new status
          group5.findOneAndUpdate(myquery, {$push: {status: {ID: ID, status: status, responsible: person, pollutionGenerated: pollutionGenerated}}}, {returnOriginal: false}).exec((err ,doc) => {
            if (err) {
              console.log("Something wrong when updating data!");
          }
          console.log(doc);
          });

           //Search and update pollution
        if(pollutionGenerated != null && pollutionGenerated != ""){
          group5.findOne(myquery).exec((err, product) => {
               group5.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
                if (err) {
                  console.log("Something wrong when updating data!");
              }
              console.log(doc);
               });
          });
        }
        }
      })
        
  }
  //It doesn't need a promise. The sleep it's ok
  await sleep(150);

  req.flash('success_msg','UPDATED!');

  //To render the map page, it's important to search for the location of the procoduct
  await group5.findOne({ID: ID}).exec((err,product) =>  {
    res.render('corporativegroup5map',{
      latlng: JSON.stringify(product.location),
      ID: ID
    });
  })
  }
});

//Map page
router.post('/corporativegroup5map', (req, res) => {
  //Variables from the ajax post
  var lat = req.body.lat;
  var lng = req.body.lng;
  var distance  = req.body.distance;
  var ID = req.body.ID;
  //Variable that we need
  var state, length, tdistance, co2, co2d;
  //Errors
  let errors = [];

  //In case of error
  if (errors.length > 0) {
    res.render('corporativegroup5map', {
      location: [lng, lat]})
  } else {
    var myquery = {ID: ID};
    //Search for Group ID
    group5.findOne({ID: ID}).exec((err ,product) => {
      //Status length and calculations of distance and pollution from the map
      length = product.status.length - 1;
      tdistance = product.distance + distance;
      if(product.pollutionGeneratedTransport == null){
        product.pollutionGeneratedTransport = 0;
      }
      co2d = 0.001*distance*0.6368;
      co2 = product.pollutionGeneratedTransport + co2d;
      state = product.status[length].status;
    if(lat != null && lat != ""){
      //Add pollution transport to the global variable
      group5.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: co2}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add pollution transport to the state variable
        group5.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.pollutionGeneratedTransport": co2d}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
      //Add new location to the global variable
      group5.findOneAndUpdate(myquery, {$set: {location: [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add new distance to the global variable
        group5.findOneAndUpdate(myquery, {$set: {distance: tdistance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
          }
            console.log(doc);
          });
        //Add new location to the state variable
        group5.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.currentLocation": [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
        //Add new distance to the state variable
        group5.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.distance": distance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
        req.flash('success_msg','You have now registered the product!');
      }
    });
 }
});

//Edit page with the corporative ID (QR)
router.post('/corporativegroup6', async(req, res) => {
  //Data
  var { ID , status, pollutionGenerated, person} = req.body;
  //errors
  let errors = [];
  //Status length value
  await group6.findOne({ID: ID }).exec((err ,product) => {
    if (product) {
      length = product.status.length - 1;
    }
  });

  var myquery = {ID: ID};
  //If there are errors
  if (errors.length > 0) {
    res.render('corporativegroup6', {
      product: Product,
      errors : errors,
      ID: ID,
      pollutionGenerated: pollutionGenerated,
      status: [
        {ID: ID, status: status, responsible: person, pollutionGenerated: pollutionGenerated}
      ]})
  //If not
  } else {
    //It can not reach this part
    if(status == null || status == ""){
      if(pollutionGenerated != null && pollutionGenerated != ""){
        group6.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
        }
        console.log(doc);
        });
      }
    //Edit in the state selected
    }else if(status != null && status != ""){
      
      group6.findOne({ID: ID, "status.status": status}).exec((err, product) => {
        //If the status exist
        if(product){
          //Change total pollution from global variables and from the certain status
          if(pollutionGenerated != null && pollutionGenerated != ""){
            group6.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log(doc);
            });
      
            group6.findOneAndUpdate({ID: ID, "status.status": status}, {$set: {"status.$.pollutionGenerated": pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!" + err);
            }
            console.log(doc);
            });
           }
           var pollutionTransport = product.status[length].pollutionGeneratedTransport;
           var distanceTransport = product.status[length].distance;

           //We have to covert the distance and the pollution transport to 0 in the state, and in the global variable too
           group6.findOne(myquery).exec((err, product) => {

             var pollution = product.pollutionGeneratedTransport - pollutionTransport;
             var distance = product.distance - distanceTransport;

             group6.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: pollution}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });

             group6.findOneAndUpdate(myquery, {$set: {distance: distance}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });
           });



        }else{
          //Id status doesnt exist it creates a new status
          group6.findOneAndUpdate(myquery, {$push: {status: {ID: ID, status: status, responsible: person, pollutionGenerated: pollutionGenerated}}}, {returnOriginal: false}).exec((err ,doc) => {
            if (err) {
              console.log("Something wrong when updating data!");
          }
          console.log(doc);
          });

           //Search and update pollution
        if(pollutionGenerated != null && pollutionGenerated != ""){
          group6.findOne(myquery).exec((err, product) => {
               group6.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
                if (err) {
                  console.log("Something wrong when updating data!");
              }
              console.log(doc);
               });
          });
        }
        }
      })
        
  }
  //It doesn't need a promise. The sleep it's ok
  await sleep(150);

  req.flash('success_msg','UPDATED!');

  //To render the map page, it's important to search for the location of the procoduct
  await group6.findOne({ID: ID}).exec((err,product) =>  {
    res.render('corporativegroup6map',{
      latlng: JSON.stringify(product.location),
      ID: ID
    });
  })
  }
});

//Map page
router.post('/corporativegroup6map', (req, res) => {
  //Variables from the ajax post
  var lat = req.body.lat;
  var lng = req.body.lng;
  var distance  = req.body.distance;
  var ID = req.body.ID;
  //Variable that we need
  var state, length, tdistance, co2, co2d;
  //Errors
  let errors = [];

  //In case of error
  if (errors.length > 0) {
    res.render('corporativegroup6map', {
      location: [lng, lat]})
  } else {
    var myquery = {ID: ID};
    //Search for Group ID
    group6.findOne({ID: ID}).exec((err ,product) => {
      //Status length and calculations of distance and pollution from the map
      length = product.status.length - 1;
      tdistance = product.distance + distance;
      if(product.pollutionGeneratedTransport == null){
        product.pollutionGeneratedTransport = 0;
      }
      co2d = 0.001*distance*0.6368;
      co2 = product.pollutionGeneratedTransport + co2d;
      state = product.status[length].status;
    if(lat != null && lat != ""){
      //Add pollution transport to the global variable
      group6.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: co2}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add pollution transport to the state variable
        group6.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.pollutionGeneratedTransport": co2d}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
      //Add new location to the global variable
      group6.findOneAndUpdate(myquery, {$set: {location: [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add new distance to the global variable
        group6.findOneAndUpdate(myquery, {$set: {distance: tdistance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
          }
            console.log(doc);
          });
        //Add new location to the state variable
        group6.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.currentLocation": [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
        //Add new distance to the state variable
        group6.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.distance": distance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
        req.flash('success_msg','You have now registered the product!');
      }
    });
      //Time to render the page to add products in the case the actual product use another registered product in the platform
      res.render('corporativeproduct6add',{
        ID: ID
      });
 }
});


//Add link between products in some way
router.post('/corporativeproduct6add', async(req, res) => {
  //Data from the form post
  var {ID, busqueda} = req.body;
  //Variable where the products found with the search input are stored.
  var products = [];
  var i = 0;
  if(busqueda == null || busqueda == ''){
    res.redirect('/index/index');
  }

    //Search a product with a name similar to the input
    food.find({name: new RegExp(busqueda, 'i')}).exec().then(async(product) => {
      //If it exist, the product is stored in the variable products
      await Promise.all(product.map(async (p) => {
        products[i] = p;
        i++;
      }))
      }).then(() => {
        //Time to render the page displaying the stored products
        res.render('corporativeproduct6show', {
          product: products,
          ID: ID
        }); 
      }) 

});


//Show product page
router.post('/corporativeproduct6show', async (req, res) => {
  //Data from the Ajax post
  var usePageProduct = req.body.usePageProduct;
  var ID = req.body.ID;
  var percentage = req.body.percentage;
  //variable to use when it's necessary 
  var myquery = {ID: ID};
  //variable of pollution
  var contamination = 0;
  group6.findOne(myquery).exec().then(async(product) => {
    contamination = contamination + product.pollutionGenerated;
  }).then(() => {
    //Time to search the product selected to link to the main product
    //Search product in food
    food.findOne({ID: usePageProduct}).exec((err, productn) => {
      //If it exist
      if(productn){
      //Data to add about the product selected
      var add = {ID: productn.ID, Name: productn.name};
      //Add product to the list of products
      group6.findOneAndUpdate(myquery, {$push: {usedProducts: add}}, {returnOriginal: false, upsert: true}, (err, doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
      }
      console.log(doc);
      });
      //Change the amount of pollution in the main product
      contamination = contamination + (productn.pollutionGenerated * (percentage/100));
      group6.findOneAndUpdate(myquery, {$set: {pollutionGenerated: contamination}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
      }
      console.log(doc);
      });
      //If it doesn't exist
    }else{
      console.log('No hay producto');
    }
    })
  })
})


//Edit page with the corporative ID (QR)
router.post('/corporativegroup7', async(req, res) => {
  //Data
  var { ID , status, pollutionGenerated, person} = req.body;
  //errors
  let errors = [];
  //Status length value
  await group7.findOne({ID: ID }).exec((err ,product) => {
    if (product) {
      length = product.status.length - 1;
    }
  });

  var myquery = {ID: ID};
  //If there are errors
  if (errors.length > 0) {
    res.render('corporativegroup7', {
      product: Product,
      errors : errors,
      ID: ID,
      pollutionGenerated: pollutionGenerated,
      status: [
        {ID: ID, status: status, responsible: person, pollutionGenerated: pollutionGenerated}
      ]})
  //If not
  } else {
    //It can not reach this part
    if(status == null || status == ""){
      if(pollutionGenerated != null && pollutionGenerated != ""){
        group7.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
        }
        console.log(doc);
        });
      }
    //Edit in the state selected
    }else if(status != null && status != ""){
      
      group7.findOne({ID: ID, "status.status": status}).exec((err, product) => {
        //If the status exist
        if(product){
          //Change total pollution from global variables and from the certain status
          if(pollutionGenerated != null && pollutionGenerated != ""){
            group7.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log(doc);
            });
      
            group7.findOneAndUpdate({ID: ID, "status.status": status}, {$set: {"status.$.pollutionGenerated": pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!" + err);
            }
            console.log(doc);
            });
           }
           var pollutionTransport = product.status[length].pollutionGeneratedTransport;
           var distanceTransport = product.status[length].distance;

           //We have to covert the distance and the pollution transport to 0 in the state, and in the global variable too
           group7.findOne(myquery).exec((err, product) => {

             var pollution = product.pollutionGeneratedTransport - pollutionTransport;
             var distance = product.distance - distanceTransport;

             group7.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: pollution}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });

             group7.findOneAndUpdate(myquery, {$set: {distance: distance}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });
           });



        }else{
          //Id status doesnt exist it creates a new status
          group7.findOneAndUpdate(myquery, {$push: {status: {ID: ID, status: status, responsible: person, pollutionGenerated: pollutionGenerated}}}, {returnOriginal: false}).exec((err ,doc) => {
            if (err) {
              console.log("Something wrong when updating data!");
          }
          console.log(doc);
          });

           //Search and update pollution
          if(pollutionGenerated != null && pollutionGenerated != ""){
          group7.findOne(myquery).exec((err, product) => {
               group1.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
                if (err) {
                  console.log("Something wrong when updating data!");
              }
              console.log(doc);
               });
          });
          }
        }
      })
        
  }
  //It doesn't need a promise. The sleep it's ok
  await sleep(150);

  req.flash('success_msg','UPDATED!');

  //To render the map page, it's important to search for the location of the procoduct
  await group7.findOne({ID: ID}).exec((err,product) =>  {
    res.render('corporativegroup7map',{
      latlng: JSON.stringify(product.location),
      ID: ID
    });
  })
  }
});

//Map page
router.post('/corporativegroup7map', (req, res) => {
  //Variables from the ajax post
  var lat = req.body.lat;
  var lng = req.body.lng;
  var distance  = req.body.distance;
  var ID = req.body.ID;
  //Variable that we need
  var state, length, tdistance, co2, co2d;
  //Errors
  let errors = [];

  //In case of error
  if (errors.length > 0) {
    res.render('corporativegroup7map', {
      location: [lng, lat]})
  } else {
    var myquery = {ID: ID};
    //Search for Group ID
    group7.findOne({ID: ID}).exec((err ,product) => {
      //Status length and calculations of distance and pollution from the map
      length = product.status.length - 1;
      tdistance = product.distance + distance;
      if(product.pollutionGeneratedTransport == null){
        product.pollutionGeneratedTransport = 0;
      }
      co2d = 0.001*distance*0.6368;
      co2 = product.pollutionGeneratedTransport + co2d;
      state = product.status[length].status;
    if(lat != null && lat != ""){
      //Add pollution transport to the global variable
      group7.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: co2}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add pollution transport to the state variable
        group7.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.pollutionGeneratedTransport": co2d}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
      //Add new location to the global variable
      group7.findOneAndUpdate(myquery, {$set: {location: [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add new distance to the global variable
        group7.findOneAndUpdate(myquery, {$set: {distance: tdistance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
          }
            console.log(doc);
          });
        //Add new location to the state variable
        group7.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.currentLocation": [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
        //Add new distance to the state variable
        group7.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.distance": distance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
        req.flash('success_msg','You have now registered the product!');
      }
    });
 }
});

//ID search to render the apropiate page
router.post('/identifierlogin', ensureAuthenticated, function(req, res, next) {
  var {ID} = req.body;
  let errors = [];

  console.log('ID: ' + ID);

  //If product doesn't exist
  if(!ID){
    errors.push({msg: 'Please enter the Identifier'});
  }

  //In case of error
  if (errors.length > 0) {
    res.render('identifierlogin', {
      errors : errors,
      ID: ID })
  } else {
    //Search of product beginning in the group 8
    Product.findOne({ID: ID }).exec((err ,product) => { 
      //If the ID exist in this group and the user has permission or is the creator
      if (product && req.user.email == product.creator || product && permission(req, product)) {
        //QR code for the ID
        QRCode.toDataURL(ID, function (err, url) {
          //QR code for the corporative ID
        QRCode.toDataURL(product.corporativeID, function (err, urlc) {
          //Load page with the necesary data to continue 
        res.render('productloginown',{
          ID: ID,
          product: product,
          length: Object.keys(product.status).length - 1,
          qr: url,
          qrc: urlc
        });
      });
      });
      //If the product exist but you are not the creator or you do not have permission
      }else if(product && req.user.email != product.creator || product && !permission(req, product)){
        //Length status
        var length = product.status.length - 1;
        if(length > 1){
          length = length -1;
        }
        //It renders just a page with information of the product without the capability to edit it
        food.findOne({ID: product.bossID}).exec((err, product2) => {
          res.render('g6g8', {
          product2: product2,
          product: product,
          latlngi: JSON.stringify(product.status[0].currentLocation),
          latlngf: JSON.stringify(product.status[length].currentLocation),
          length: Object.keys(product.status).length - 1
          });
        });
      }
      //If the ID is not registered in the group 8
      if(!product){
        //Starts to search in the group 8 with the corporative ID
        Product.findOne({corporativeID: ID }).exec((err ,productn) => {
          if(product){
          QRCode.toDataURL(ID, function (err, url) {
            QRCode.toDataURL(productn.ID, function (err, urlc) {
            res.render('productloginown', {
              ID: ID,
              product: productn,
              length: Object.keys(productn.status).length - 1,
              qr: urlc,
              qrc: url
            });
            });
          });
          }
          //If the corporative ID is not registered in the group 8
          if(!product){
            //Starts to search in the group 1 with the ID
            group1.findOne({ID: ID }).exec((err ,product) => { 
              if (product && req.user.email == product.creator || product && permission(req, product)) {
                QRCode.toDataURL(ID, function (err, url) {
                QRCode.toDataURL(product.corporativeID, function (err, urlc) {
                res.render('group1edit',{
                  ID: product.ID,
                  bossID: product.bossID,
                  group1: product,
                  length: Object.keys(product.status).length - 1,
                  qr: url,
                  qrc: urlc
                });
              });
              });
              }else if(product && req.user.email != product.creator || product && !permission(req, product)){
                var length = product.status.length - 1;
                if(length > 1){
                  length = length -1;
                }
                food.findOne({ID: product.bossID}).exec((err, product2) => {
                  res.render('productlogin', {
                  product2: product,
                  product: product,
                  latlngi: JSON.stringify(product.status[0].currentLocation),
                  latlngf: JSON.stringify(product.status[length].currentLocation),
                  length: Object.keys(product.status).length - 1
                  });
                });
              }
              if(!product){
                group1.findOne({corporativeID: ID }).exec((err ,productn) => {
                  if(productn){
                  QRCode.toDataURL(ID, function (err, url) {
                    QRCode.toDataURL(productn.ID, function (err, urlc) {
                    res.render('group1edit', {
                      ID: ID,
                      group1: productn,
                      length: Object.keys(productn.status).length - 1,
                      qr: urlc,
                      qrc: url
                    });
                    });
                  });
                  }
                  if(!productn){
                    group2.findOne({ID: ID }).exec((err ,product) => { 
                      if (product && req.user.email == product.creator || product && permission(req, product)) {
                        QRCode.toDataURL(ID, function (err, url) {
                        QRCode.toDataURL(product.corporativeID, function (err, urlc) {
                        res.render('group2edit',{
                          ID: ID,
                          group2: product,
                          length: Object.keys(product.status).length - 1,
                          qr: url,
                          qrc: urlc
                        });
                      });
                      });
                      }else if(product && req.user.email != product.creator || product && !permission(req, product)){
                        var length = product.status.length - 1;
                        if(length > 1){
                          length = length -1;
                        }
                        food.findOne({ID: product.bossID}).exec((err, product2) => {
                          res.render('productlogin', {
                          product2: product,
                          product: product,
                          latlngi: JSON.stringify(product.status[0].currentLocation),
                          latlngf: JSON.stringify(product.status[length].currentLocation),
                          length: Object.keys(product.status).length - 1
                          });
                        });
                      }
                      if(!product){
                        group2.findOne({corporativeID: ID }).exec((err ,productn) => {
                          if(productn){
                          QRCode.toDataURL(ID, function (err, url) {
                            QRCode.toDataURL(productn.ID, function (err, urlc) {
                            res.render('group2edit', {
                              ID: ID,
                              group2: productn,
                              length: Object.keys(productn.status).length - 1,
                              qr: urlc,
                              qrc: url
                            });
                            });
                          });
                          }
                          if(!productn){
                            group3.findOne({ID: ID }).exec((err ,product) => { 
                              if (product && req.user.email == product.creator || product && permission(req, product)) {
                                QRCode.toDataURL(ID, function (err, url) {
                                QRCode.toDataURL(product.corporativeID, function (err, urlc) {
                                res.render('group3edit',{
                                  ID: ID,
                                  group3: product,
                                  length: Object.keys(product.status).length - 1,
                                  qr: url,
                                  qrc: urlc
                                });
                              });
                              });
                              }else if(product && req.user.email != product.creator || product && !permission(req, product)){
                                var length = product.status.length - 1;
                                if(length > 1){
                                  length = length -1;
                                }
                                food.findOne({ID: product.bossID}).exec((err, product2) => {
                                  res.render('productlogin', {
                                  product2: product,
                                  product: product,
                                  latlngi: JSON.stringify(product.status[0].currentLocation),
                                  latlngf: JSON.stringify(product.status[length].currentLocation),
                                  length: Object.keys(product.status).length - 1
                                  });
                                });
                              }
                              if(!product){
                                group3.findOne({corporativeID: ID }).exec((err ,productn) => {
                                  if(productn){
                                  QRCode.toDataURL(ID, function (err, url) {
                                    QRCode.toDataURL(productn.ID, function (err, urlc) {
                                    res.render('group3edit', {
                                      ID: ID,
                                      group3: productn,
                                      length: Object.keys(productn.status).length - 1,
                                      qr: urlc,
                                      qrc: url
                                    });
                                    });
                                  });
                                  }
                                  if(!productn){
                                    group4.findOne({ID: ID }).exec((err ,product) => { 
                                      if (product && req.user.email == product.creator || product && permission(req, product)) {
                                        QRCode.toDataURL(ID, function (err, url) {
                                        QRCode.toDataURL(product.corporativeID, function (err, urlc) {
                                        res.render('group4edit',{
                                          ID: ID,
                                          group4: product,
                                          length: Object.keys(product.status).length - 1,
                                          qr: url,
                                          qrc: urlc
                                        });
                                      });
                                      });
                                      }else if(product && req.user.email != product.creator || product && !permission(req, product)){
                                        var length = product.status.length - 1;
                                        if(length > 1){
                                          length = length -1;
                                        }
                                        food.findOne({ID: product.bossID}).exec((err, product2) => {
                                          res.render('productlogin', {
                                          product2: product,
                                          product: product,
                                          latlngi: JSON.stringify(product.status[0].currentLocation),
                                          latlngf: JSON.stringify(product.status[length].currentLocation),
                                          length: Object.keys(product.status).length - 1
                                          });
                                        });
                                      }
                                      if(!product){
                                        group4.findOne({corporativeID: ID }).exec((err ,productn) => {
                                          if(productn){
                                          QRCode.toDataURL(ID, function (err, url) {
                                            QRCode.toDataURL(productn.ID, function (err, urlc) {
                                            res.render('group4edit', {
                                              ID: ID,
                                              group4: productn,
                                              length: Object.keys(productn.status).length - 1,
                                              qr: urlc,
                                              qrc: url
                                            });
                                            });
                                          });
                                          }
                                          if(!productn){
                                            group5.findOne({ID: ID }).exec((err ,product) => { 
                                              if (product && req.user.email == product.creator || product && permission(req, product)) {
                                                QRCode.toDataURL(ID, function (err, url) {
                                                QRCode.toDataURL(product.corporativeID, function (err, urlc) {
                                                res.render('group5edit',{
                                                  ID: ID,
                                                  group5: product,
                                                  length: Object.keys(product.status).length - 1,
                                                  qr: url,
                                                  qrc: urlc
                                                });
                                              });
                                              });
                                              }else if(product && req.user.email != product.creator || product && !permission(req, product)){
                                                var length = product.status.length - 1;
                                                if(length > 1){
                                                  length = length -1;
                                                }
                                                food.findOne({ID: product.bossID}).exec((err, product2) => {
                                                  res.render('productlogin', {
                                                  product2: product,
                                                  product: product,
                                                  latlngi: JSON.stringify(product.status[0].currentLocation),
                                                  latlngf: JSON.stringify(product.status[length].currentLocation),
                                                  length: Object.keys(product.status).length - 1
                                                  });
                                                });
                                              }
                                              if(!product){
                                                group5.findOne({corporativeID: ID }).exec((err ,productn) => {
                                                  if(productn){
                                                  QRCode.toDataURL(ID, function (err, url) {
                                                    QRCode.toDataURL(productn.ID, function (err, urlc) {
                                                    res.render('group5edit', {
                                                      ID: ID,
                                                      group5: productn,
                                                      length: Object.keys(productn.status).length - 1,
                                                      qr: urlc,
                                                      qrc: url
                                                    });
                                                    });
                                                  });
                                                  }
                                                  if(!productn){
                                                    group6.findOne({ID: ID }).exec((err ,product) => { 
                                                      if (product && req.user.email == product.creator || product && permission(req, product)) {
                                                        QRCode.toDataURL(ID, function (err, url) {
                                                        QRCode.toDataURL(product.corporativeID, function (err, urlc) {
                                                        res.render('group6edit',{
                                                          ID: ID,
                                                          group6: product,
                                                          length: Object.keys(product.status).length - 1,
                                                          qr: url,
                                                          qrc: urlc
                                                        });
                                                      });
                                                      });
                                                      }else if(product && req.user.email != product.creator || product && !permission(req, product)){
                                                        var length = product.status.length - 1;
                                                        if(length > 1){
                                                          length = length -1;
                                                        }
                                                        food.findOne({ID: product.bossID}).exec((err, product2) => {
                                                          res.render('g6g8', {
                                                          product2: product2,
                                                          product: product,
                                                          latlngi: JSON.stringify(product.status[0].currentLocation),
                                                          latlngf: JSON.stringify(product.status[length].currentLocation),
                                                          length: Object.keys(product.status).length - 1
                                                          });
                                                        });
                                                      }
                                                      if(!product){
                                                        group6.findOne({corporativeID: ID }).exec((err ,productn) => {
                                                          if(productn){
                                                          QRCode.toDataURL(ID, function (err, url) {
                                                            QRCode.toDataURL(productn.ID, function (err, urlc) {
                                                            res.render('group6edit', {
                                                              ID: ID,
                                                              group6: productn,
                                                              length: Object.keys(productn.status).length - 1,
                                                              qr: urlc,
                                                              qrc: url
                                                            });
                                                            });
                                                          });
                                                          }
                                                          if(!productn){
                                                            group7.findOne({ID: ID }).exec((err ,product) => { 
                                                              if (product && req.user.email == product.creator || product && permission(req, product)) {
                                                                QRCode.toDataURL(ID, function (err, url) {
                                                                QRCode.toDataURL(product.corporativeID, function (err, urlc) {
                                                                res.render('group7edit',{
                                                                  ID: ID,
                                                                  group7: product,
                                                                  length: Object.keys(product.status).length - 1,
                                                                  qr: url,
                                                                  qrc: urlc
                                                                });
                                                              });
                                                              });
                                                              }else if(product && req.user.email != product.creator || product && !permission(req, product)){
                                                                var length = product.status.length - 1;
                                                                if(length > 1){
                                                                  length = length -1;
                                                                }
                                                                food.findOne({ID: product.bossID}).exec((err, product2) => {
                                                                  res.render('productlogin', {
                                                                  product2: product,
                                                                  product: product,
                                                                  latlngi: JSON.stringify(product.status[0].currentLocation),
                                                                  latlngf: JSON.stringify(product.status[length].currentLocation),
                                                                  length: Object.keys(product.status).length - 1
                                                                  });
                                                                });
                                                              }
                                                              if(!product){
                                                                group7.findOne({corporativeID: ID }).exec((err ,productn) => {
                                                                  if(productn){
                                                                  QRCode.toDataURL(ID, function (err, url) {
                                                                    QRCode.toDataURL(productn.ID, function (err, urlc) {
                                                                    res.render('group7edit', {
                                                                      ID: ID,
                                                                      group7: productn,
                                                                      length: Object.keys(productn.status).length - 1,
                                                                      qr: urlc,
                                                                      qrc: url
                                                                    });
                                                                    });
                                                                  });
                                                                  }
                                                                });
                                                              }
                                                              
                                                            });

                                                          }
                                                
                                                
                                                        });
                                                      }
                                                      
                                                    });

                                                  }
                                        
                                        
                                                });
                                              }
                                              
                                            });

                                          }
                                
                                
                                        });
                                      }
                                      
                                    });
                                    
                                  }
                        
                        
                                });
                              }
                              
                            });

                          }
                
                
                        });
                      }
                      
                    });
                    
                  }
        
        
                });
              }
              
            });

          }


        });
      }
      
    });
  }

});

router.post('/productlogin', ensureAuthenticated, function(req, res, next) {
  calling.aFunction();
});


router.post('/productloginown', ensureAuthenticated, async(req, res) => {
  //Normal data variables
   var {ID, status, pollutionGenerated, permissions} = req.body;


  let errors = [];
  //Take the status length value
  Product.findOne({ID: ID }).exec((err ,product) => {
    if (product) {
      length = product.status.length - 1;
    }
  });
  var myquery = {ID: ID};
  await sleep(50);
  
  //In case of error
  if (errors.length > 0) {
    res.render('productloginown', {
      product: Product,
      errors : errors,
      ID: ID,
      pollutionGenerated: pollutionGenerated,
      permissions: permissions,
      status: [
        {ID: ID, status: status, responsible: req.user.email, pollutionGenerated: pollutionGenerated}
      ]})
  } else {

      //Add permissions
    if(permissions!= null && permissions != ""){
      Product.update(myquery, {$push: {permissions: {$each: [permissions], $position: -1}}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
      }
  
      console.log(doc);
      });
    }

    if(status == null || status == ""){
      if(pollutionGenerated != null && pollutionGenerated != ""){
        Product.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
        }
        console.log(doc);
        });
      }
    }else if(status != null && status != ""){
      //Edit status selected
      Product.findOne({ID: ID, "status.status": status}).exec((err, product) => {
        //If status exist
        if(product){
          //Change total pollution from global variables and from the certain status
          if(pollutionGenerated != null && pollutionGenerated != ""){
            Product.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log(doc);
            });


            Product.findOneAndUpdate({ID: ID, "status.status": status}, {$set: {"status.$.pollutionGenerated": pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!" + err);
            }
            console.log(doc);
            });
           }
           var pollutionTransport = product.status[length].pollutionGeneratedTransport;
           var distanceTransport = product.status[length].distance;

           console.log("DATA: " + distanceTransport + " DATA: " + pollutionTransport);

           //We have to covert the distance and the pollution transport to 0 in the state, and in the global variable too
           Product.findOne(myquery).exec((err, product) => {

             var pollution = product.pollutionGeneratedTransport - pollutionTransport;
             var distance = product.distance - distanceTransport;

             console.log("DISTANCE: " + distance + " POLLUTION: " + pollution);
             Product.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: pollution}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });

             Product.findOneAndUpdate(myquery, {$set: {distance: distance}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });
           });

        }else{
          //Id status doesnt exist it creates a new status
          Product.findOneAndUpdate(myquery, {$push: {status: {ID: ID, status: status, responsible: req.user.email, pollutionGenerated: pollutionGenerated}}}, {returnOriginal: false}).exec((err ,doc) => {
            if (err) {
              console.log("Something wrong when updating data!");
          }
          console.log(doc);
          });

          //Search and update pollution
          if(pollutionGenerated != null && pollutionGenerated != ""){
          Product.findOne(myquery).exec((err, product) => {
              Product.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
                if (err) {
                  console.log("Something wrong when updating data!");
              }
              console.log(doc);
               });
          });
          }

        }
      })
        
  }
  //It doesn't need a promise. The sleep it's ok
 await sleep(150);

    req.flash('success_msg','UPDATED!');

    //To render the map page, it's important to search for the location of the procoduct
    await Product.findOne({ID: ID}).exec((err,product) =>  {
      console.log('LOCATION: ' + product.location);
      res.render('producteditmap',{
        latlng: JSON.stringify(product.location),
        ID: ID
      });
    })

  }
});

//Map page
router.post('/producteditmap', ensureAuthenticated, (req, res) => {
  //Variables from the ajax post
  var lat = req.body.lat;
  var lng = req.body.lng;
  var distance = req.body.distance;
  var ID = req.body.ID;
  //Variable that we need
  var state, length, tdistance, co2, co2d;
  //Errors
  let errors = [];

  //In case of error
  if (errors.length > 0) {
    res.render('producteditmap', {
      location: [lng, lat]})
  } else {
    var myquery = {ID: ID};
    //Search for Group ID
    Product.findOne({ID: ID }).exec((err ,product) => {
      //Status length and calculations of distance and pollution from the map
      length = product.status.length - 1;
      tdistance = product.distance + distance;
      if(product.pollutionGeneratedTransport == null){
        product.pollutionGeneratedTransport = 0;
      }
      co2d = 0.001*distance*0.6368;
      co2 = product.pollutionGeneratedTransport + co2d;
      state = product.status[length].status;
    if(lat != null && lat != ""){
      //Add pollution transport to the global variable
      Product.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: co2}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add pollution transport to the state variable
        Product.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.pollutionGeneratedTransport": co2d}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
      //Add new location to the global variable
      Product.findOneAndUpdate(myquery, {$set: {location: [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add new distance to the global variable
        Product.findOneAndUpdate(myquery, {$set: {distance: tdistance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
          }
            console.log(doc);
          });
        //Add new location to the state variable
        Product.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.currentLocation": [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        });
        console.log(co2d);
        //Add new distance to the state variable
        Product.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.distance": distance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });

        req.flash('success_msg','You have now registered the product!');
      }
    });
    //Time to render the page to add products in the case the actual product use another registered product in the platform
    res.render('productaddedit',{
      ID: ID
    }); 
 }
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 

//Add link between products in some way
router.post('/productaddedit',ensureAuthenticated, async(req,res)=>{
  //Data from the form post
  var {ID, busqueda} = req.body;
  //Variable where the products found with the search input are stored.
  var products = new Array();
  var i = 0;
  if(busqueda == null || busqueda == ''){
    res.redirect('/index/indexlogin');
  }

    //Search a product with a name similar to the input
    food.find({name: new RegExp(busqueda, 'i')}).exec().then(async(product) => {
      //If it exist, the product is stored in the variable products
      await Promise.all(product.map(async (p) => {
        products[i] = p;
        i++;
      }))
      }).then(() => {
        //Time to render the page displaying the stored products
        res.render('productshowedit', {
          product: products,
          ID: ID
        }); 
      }) 

})
//Show product page
router.post('/productshowedit', ensureAuthenticated, async (req, res) => {
  //Data from the Ajax post
  var usePageProduct = req.body.usePageProduct;
  var ID = req.body.ID;
  var percentage = req.body.percentage;
  //variable to use when it's necessary 
  var myquery = {ID: ID};
  //variable of pollution
  var contamination = 0;
  Product.findOne(myquery).exec().then(async(product) => {
    contamination = contamination + product.pollutionGenerated;
  }).then(() => {
    //Time to search the product selected to link to the main product
    //Search product in food
    food.findOne({ID: usePageProduct}).exec((err, productn) => {
      //If it exist
      if(productn){
      //Data to add about the product selected
      var add = {ID: productn.ID, Name: productn.name};
      //Add product to the list of products
      Product.findOneAndUpdate(myquery, {$push: {usedProducts: add}}, {returnOriginal: false, upsert: true}, (err, doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
      }
      console.log(doc);
      });
      //Change the amount of pollution in the main product
      contamination = contamination + (productn.pollutionGenerated * (percentage/100));
      Product.findOneAndUpdate(myquery, {$set: {pollutionGenerated: contamination}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
      }
      console.log(doc);
      });
      //If it doesn't exist
    }else{
      console.log('No hay producto');
    }
    })
  })
})
//Group 1
router.post('/group1edit', ensureAuthenticated, async(req, res) => {
  //Normal data variables
   var {ID, bossID, status, pollutionGenerated, permissions} = req.body;


  let errors = [];
  //Take the status length value
  group1.findOne({ID: ID }).exec((err ,product) => {
    if (product) {
      length = product.status.length - 1;
    }
  });
  var myquery = {ID: ID};
  await sleep(50);
  
  //In case of error
  if (errors.length > 0) {
    res.render('group1edit', {
      product: Product,
      errors : errors,
      ID: ID,
      pollutionGenerated: pollutionGenerated,
      permissions: permissions,
      status: [
        {ID: ID, status: status, responsible: req.user.email, pollutionGenerated: pollutionGenerated}
      ]})
  } else {

      //Add permissions
    if(permissions!= null && permissions != ""){
      group1.update(myquery, {$push: {permissions: {$each: [permissions], $position: -1}}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
      }
  
      console.log(doc);
      });
    }

    if(status == null || status == ""){
      if(pollutionGenerated != null && pollutionGenerated != ""){
        group1.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
        }
        console.log(doc);
        });
      }
    }else if(status != null && status != ""){
      //Edit status selected
      group1.findOne({ID: ID, "status.status": status}).exec((err, product) => {
        //If status exist
        if(product){
          //Change total pollution from global variables and from the certain status
          if(pollutionGenerated != null && pollutionGenerated != ""){
            group1.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log(doc);
            });


            group1.findOneAndUpdate({ID: ID, "status.status": status}, {$set: {"status.$.pollutionGenerated": pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!" + err);
            }
            console.log(doc);
            });
           }
           var pollutionTransport = product.status[length].pollutionGeneratedTransport;
           var distanceTransport = product.status[length].distance;

           console.log("DATA: " + distanceTransport + " DATA: " + pollutionTransport);

           //We have to covert the distance and the pollution transport to 0 in the state, and in the global variable too
           group1.findOne(myquery).exec((err, product) => {

             var pollution = product.pollutionGeneratedTransport - pollutionTransport;
             var distance = product.distance - distanceTransport;

             console.log("DISTANCE: " + distance + " POLLUTION: " + pollution);
             group1.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: pollution}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });

             group1.findOneAndUpdate(myquery, {$set: {distance: distance}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });
           });

        }else{
          //Id status doesnt exist it creates a new status
          group1.findOneAndUpdate(myquery, {$push: {status: {ID: ID, status: status, responsible: req.user.email, pollutionGenerated: pollutionGenerated}}}, {returnOriginal: false}).exec((err ,doc) => {
            if (err) {
              console.log("Something wrong when updating data!");
          }
          console.log(doc);
          });

          //Search and update pollution
          if(pollutionGenerated != null && pollutionGenerated != ""){
          group1.findOne(myquery).exec((err, product) => {
               group1.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
                if (err) {
                  console.log("Something wrong when updating data!");
              }
              console.log(doc);
               });
          });
          }

        }
      })
        
  }
  //It doesn't need a promise. The sleep it's ok
 await sleep(150);

    req.flash('success_msg','UPDATED!');

    //To render the map page, it's important to search for the location of the procoduct
    await group1.findOne({ID: ID}).exec((err,product) =>  {
      console.log('LOCATION: ' + product.location);
      res.render('group1editmap',{
        latlng: JSON.stringify(product.location),
        ID: ID
      });
    })

  }
});

//Map page
router.post('/group1editmap', ensureAuthenticated, (req, res) => {
  //Variables from the ajax post
  var lat = req.body.lat;
  var lng = req.body.lng;
  var distance = req.body.distance;
  var ID = req.body.ID;
  //Variable that we need
  var state, length, tdistance, co2, co2d;
  //Errors
  let errors = [];

  //In case of error
  if (errors.length > 0) {
    res.render('group1editmap', {
      location: [lng, lat]})
  } else {
    var myquery = {ID: ID};
    //Search for Group ID
    group1.findOne({ID: ID }).exec((err ,product) => {
      //Status length and calculations of distance and pollution from the map
      length = product.status.length - 1;
      tdistance = product.distance + distance;
      if(product.pollutionGeneratedTransport == null){
        product.pollutionGeneratedTransport = 0;
      }
      co2d = 0.001*distance*0.6368;
      co2 = product.pollutionGeneratedTransport + co2d;
      state = product.status[length].status;
    if(lat != null && lat != ""){
      //Add pollution transport to the global variable
      group1.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: co2}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add pollution transport to the state variable
        group1.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.pollutionGeneratedTransport": co2d}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
      //Add new location to the global variable
      group1.findOneAndUpdate(myquery, {$set: {location: [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add new distance to the global variable
        group1.findOneAndUpdate(myquery, {$set: {distance: tdistance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
          }
            console.log(doc);
          });
        //Add new location to the state variable
        group1.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.currentLocation": [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        });
        console.log(co2d);
        //Add new distance to the state variable
        group1.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.distance": distance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });

        req.flash('success_msg','You have now registered the product!');
      }
    });
 }
});


router.post('/group2edit', ensureAuthenticated, async(req, res) => {
  //Normal data variables
   var {ID, status,pollutionGenerated, permissions} = req.body;


  let errors = [];
  //Take the status length value
  group2.findOne({ID: ID }).exec((err ,product) => {
    if (product) {
      length = product.status.length - 1;
    }
  });
  var myquery = {ID: ID};
  await sleep(50);
  
  //In case of error
  if (errors.length > 0) {
    res.render('group2edit', {
      product: Product,
      errors : errors,
      ID: ID,
      pollutionGenerated: pollutionGenerated,
      permissions: permissions,
      status: [
        {ID: ID, status: status, responsible: req.user.email, pollutionGenerated: pollutionGenerated}
      ]})
  } else {

      //Add permissions
    if(permissions!= null && permissions != ""){
      group2.update(myquery, {$push: {permissions: {$each: [permissions], $position: -1}}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
      }
  
      console.log(doc);
      });
    }

    if(status == null || status == ""){
      if(pollutionGenerated != null && pollutionGenerated != ""){
        group2.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
        }
        console.log(doc);
        });
      }
    }else if(status != null && status != ""){
      //Edit status selected
      group2.findOne({ID: ID, "status.status": status}).exec((err, product) => {
        //If status exist
        if(product){
          //Change total pollution from global variables and from the certain status
          if(pollutionGenerated != null && pollutionGenerated != ""){
 
            group2.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log(doc);
            });


            group2.findOneAndUpdate({ID: ID, "status.status": status}, {$set: {"status.$.pollutionGenerated": pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!" + err);
            }
            console.log(doc);
            });
           }
           var pollutionTransport = product.status[length].pollutionGeneratedTransport;
           var distanceTransport = product.status[length].distance;

           console.log("DATA: " + distanceTransport + " DATA: " + pollutionTransport);

           //We have to covert the distance and the pollution transport to 0 in the state, and in the global variable too
           group2.findOne(myquery).exec((err, product) => {

             var pollution = product.pollutionGeneratedTransport - pollutionTransport;
             var distance = product.distance - distanceTransport;

             console.log("DISTANCE: " + distance + " POLLUTION: " + pollution);
             group2.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: pollution}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });

             group2.findOneAndUpdate(myquery, {$set: {distance: distance}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });
           });

        }else{
          //Id status doesnt exist it creates a new status
          group2.findOneAndUpdate(myquery, {$push: {status: {ID: ID, status: status, responsible: req.user.email, pollutionGenerated: pollutionGenerated}}}, {returnOriginal: false}).exec((err ,doc) => {
            if (err) {
              console.log("Something wrong when updating data!");
          }
          console.log(doc);
          });

          //Search and update pollution
          if(pollutionGenerated != null && pollutionGenerated != ""){
          group2.findOne(myquery).exec((err, product) => {
               group2.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
                if (err) {
                  console.log("Something wrong when updating data!");
              }
              console.log(doc);
               });
          });
          }

        }
      })
        
  }
  //It doesn't need a promise. The sleep it's ok
 await sleep(150);

    req.flash('success_msg','UPDATED!');

    //To render the map page, it's important to search for the location of the procoduct
    await group2.findOne({ID: ID}).exec((err,product) =>  {
      console.log('LOCATION: ' + product.location);
      res.render('group2editmap',{
        latlng: JSON.stringify(product.location),
        ID: ID
      });
    })

  }
});

//Map page
router.post('/group2editmap', ensureAuthenticated, (req, res) => {
  //Variables from the ajax post
  var lat = req.body.lat;
  var lng = req.body.lng;
  var distance = req.body.distance;
  var ID = req.body.ID;
  //Variable that we need
  var state, length, tdistance, co2, co2d;
  //Errors
  let errors = [];

  //In case of error
  if (errors.length > 0) {
    res.render('group2editmap', {
      location: [lng, lat]})
  } else {
    var myquery = {ID: ID};
    //Search for Group ID
    group2.findOne({ID: ID }).exec((err ,product) => {
      //Status length and calculations of distance and pollution from the map
      length = product.status.length - 1;
      tdistance = product.distance + distance;
      if(product.pollutionGeneratedTransport == null){
        product.pollutionGeneratedTransport = 0;
      }
      co2d = 0.001*distance*0.6368;
      co2 = product.pollutionGeneratedTransport + co2d;
      state = product.status[length].status;
    if(lat != null && lat != ""){
      //Add pollution transport to the global variable
      group2.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: co2}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add pollution transport to the state variable
        group2.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.pollutionGeneratedTransport": co2d}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
      //Add new location to the global variable
      group2.findOneAndUpdate(myquery, {$set: {location: [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add new distance to the global variable
        group2.findOneAndUpdate(myquery, {$set: {distance: tdistance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
          }
            console.log(doc);
          });
        //Add new location to the state variable
        group2.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.currentLocation": [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        });
        console.log(co2d);
        //Add new distance to the state variable
        group2.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.distance": distance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });

        req.flash('success_msg','You have now registered the product!');
      }
    });
 }
});

router.post('/group3edit', ensureAuthenticated, async(req, res) => {
  //Normal data variables
   var {ID, status, pollutionGenerated, permissions} = req.body;


  let errors = [];
  //Take the status length value
  group3.findOne({ID: ID }).exec((err ,product) => {
    if (product) {
      length = product.status.length - 1;
    }
  });
  var myquery = {ID: ID};
  await sleep(50);
  
  //In case of error
  if (errors.length > 0) {
    res.render('group3edit', {
      product: Product,
      errors : errors,
      ID: ID,
      pollutionGenerated: pollutionGenerated,
      permissions: permissions,
      status: [
        {ID: ID, status: status, responsible: req.user.email, pollutionGenerated: pollutionGenerated}
      ]})
  } else {

      //Add permissions
    if(permissions!= null && permissions != ""){
      group3.update(myquery, {$push: {permissions: {$each: [permissions], $position: -1}}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
      }
  
      console.log(doc);
      });
    }

    if(status == null || status == ""){
      if(pollutionGenerated != null && pollutionGenerated != ""){
        group3.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
        }
        console.log(doc);
        });
      }
    }else if(status != null && status != ""){
      //Edit status selected
      group3.findOne({ID: ID, "status.status": status}).exec((err, product) => {
        //If status exist
        if(product){
          //Change total pollution from global variables and from the certain status
          if(pollutionGenerated != null && pollutionGenerated != ""){
 
            group3.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log(doc);
            });


            group3.findOneAndUpdate({ID: ID, "status.status": status}, {$set: {"status.$.pollutionGenerated": pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!" + err);
            }
            console.log(doc);
            });
           }
           var pollutionTransport = product.status[length].pollutionGeneratedTransport;
           var distanceTransport = product.status[length].distance;

           console.log("DATA: " + distanceTransport + " DATA: " + pollutionTransport);

           //We have to covert the distance and the pollution transport to 0 in the state, and in the global variable too
           group3.findOne(myquery).exec((err, product) => {

             var pollution = product.pollutionGeneratedTransport - pollutionTransport;
             var distance = product.distance - distanceTransport;

             console.log("DISTANCE: " + distance + " POLLUTION: " + pollution);
             group3.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: pollution}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });

             group3.findOneAndUpdate(myquery, {$set: {distance: distance}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });
           });

        }else{
          //Id status doesnt exist it creates a new status
          group3.findOneAndUpdate(myquery, {$push: {status: {ID: ID, status: status, responsible: req.user.email, pollutionGenerated: pollutionGenerated}}}, {returnOriginal: false}).exec((err ,doc) => {
            if (err) {
              console.log("Something wrong when updating data!");
          }
          console.log(doc);
          });

          //Search and update pollution
          if(pollutionGenerated != null && pollutionGenerated != ""){
          group3.findOne(myquery).exec((err, product) => {
               group3.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
                if (err) {
                  console.log("Something wrong when updating data!");
              }
              console.log(doc);
               });
          });
          }
        }
      })
        
  }
  //It doesn't need a promise. The sleep it's ok
 await sleep(150);

    req.flash('success_msg','UPDATED!');

    //To render the map page, it's important to search for the location of the procoduct
    await group3.findOne({ID: ID}).exec((err,product) =>  {
      console.log('LOCATION: ' + product.location);
      res.render('group3editmap',{
        latlng: JSON.stringify(product.location),
        ID: ID
      });
    })

  }
});

//Map page
router.post('/group3editmap', ensureAuthenticated, (req, res) => {
  //Variables from the ajax post
  var lat = req.body.lat;
  var lng = req.body.lng;
  var distance = req.body.distance;
  var ID = req.body.ID;
  //Variable that we need
  var state, length, tdistance, co2, co2d;
  //Errors
  let errors = [];

  //In case of error
  if (errors.length > 0) {
    res.render('group3editmap', {
      location: [lng, lat]})
  } else {
    var myquery = {ID: ID};
    //Search for Group ID
    group3.findOne({ID: ID }).exec((err ,product) => {
      //Status length and calculations of distance and pollution from the map
      length = product.status.length - 1;
      tdistance = product.distance + distance;
      if(product.pollutionGeneratedTransport == null){
        product.pollutionGeneratedTransport = 0;
      }
      co2d = 0.001*distance*0.6368;
      co2 = product.pollutionGeneratedTransport + co2d;
      state = product.status[length].status;
    if(lat != null && lat != ""){
      //Add pollution transport to the global variable
      group3.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: co2}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add pollution transport to the state variable
        group3.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.pollutionGeneratedTransport": co2d}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
      //Add new location to the global variable
      group3.findOneAndUpdate(myquery, {$set: {location: [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add new distance to the global variable
        group3.findOneAndUpdate(myquery, {$set: {distance: tdistance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
          }
            console.log(doc);
          });
        //Add new location to the state variable
        group3.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.currentLocation": [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        });
        console.log(co2d);
        //Add new distance to the state variable
        group3.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.distance": distance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });

        req.flash('success_msg','You have now registered the product!');
      }
    });
 }
});


router.post('/group4edit', ensureAuthenticated, async(req, res) => {
  //Normal data variables
   var {ID, status, pollutionGenerated, permissions} = req.body;


  let errors = [];
  //Take the status length value
  group4.findOne({ID: ID }).exec((err ,product) => {
    if (product) {
      length = product.status.length - 1;
    }
  });
  var myquery = {ID: ID};
  await sleep(50);
  
  //In case of error
  if (errors.length > 0) {
    res.render('group4edit', {
      product: Product,
      errors : errors,
      ID: ID,
      pollutionGenerated: pollutionGenerated,
      permissions: permissions,
      status: [
        {ID: ID, status: status, responsible: req.user.email, pollutionGenerated: pollutionGenerated}
      ]})
  } else {

      //Add permissions
    if(permissions!= null && permissions != ""){
      group4.update(myquery, {$push: {permissions: {$each: [permissions], $position: -1}}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
      }
  
      console.log(doc);
      });
    }

    if(status == null || status == ""){
      if(pollutionGenerated != null && pollutionGenerated != ""){
        group4.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
        }
        console.log(doc);
        });
      }
    }else if(status != null && status != ""){
      //Edit status selected
      group4.findOne({ID: ID, "status.status": status}).exec((err, product) => {
        //If status exist
        if(product){
          //Change total pollution from global variables and from the certain status
          if(pollutionGenerated != null && pollutionGenerated != ""){
 
            group4.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log(doc);
            });


            group4.findOneAndUpdate({ID: ID, "status.status": status}, {$set: {"status.$.pollutionGenerated": pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!" + err);
            }
            console.log(doc);
            });
           }
           var pollutionTransport = product.status[length].pollutionGeneratedTransport;
           var distanceTransport = product.status[length].distance;

           console.log("DATA: " + distanceTransport + " DATA: " + pollutionTransport);

           //We have to covert the distance and the pollution transport to 0 in the state, and in the global variable too
           group4.findOne(myquery).exec((err, product) => {

             var pollution = product.pollutionGeneratedTransport - pollutionTransport;
             var distance = product.distance - distanceTransport;

             console.log("DISTANCE: " + distance + " POLLUTION: " + pollution);
             group4.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: pollution}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });

             group4.findOneAndUpdate(myquery, {$set: {distance: distance}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });
           });

        }else{
          //Id status doesnt exist it creates a new status
          group4.findOneAndUpdate(myquery, {$push: {status: {ID: ID, status: status, responsible: req.user.email, pollutionGenerated: pollutionGenerated}}}, {returnOriginal: false}).exec((err ,doc) => {
            if (err) {
              console.log("Something wrong when updating data!");
          }
          console.log(doc);
          });

          //Search and update pollution
          if(pollutionGenerated != null && pollutionGenerated != ""){
          group4.findOne(myquery).exec((err, product) => {
               group4.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
                if (err) {
                  console.log("Something wrong when updating data!");
              }
              console.log(doc);
               });
          });
          }
        }
      })
        
  }
  //It doesn't need a promise. The sleep it's ok
 await sleep(150);

    req.flash('success_msg','UPDATED!');

    //To render the map page, it's important to search for the location of the procoduct
    await group4.findOne({ID: ID}).exec((err,product) =>  {
      console.log('LOCATION: ' + product.location);
      res.render('group4editmap',{
        latlng: JSON.stringify(product.location),
        ID: ID
      });
    })

  }
});

//Map page
router.post('/group4editmap', ensureAuthenticated, (req, res) => {
  //Variables from the ajax post
  var lat = req.body.lat;
  var lng = req.body.lng;
  var distance = req.body.distance;
  var ID = req.body.ID;
  //Variable that we need
  var state, length, tdistance, co2, co2d;
  //Errors
  let errors = [];

  //In case of error
  if (errors.length > 0) {
    res.render('group4editmap', {
      location: [lng, lat]})
  } else {
    var myquery = {ID: ID};
    //Search for Group ID
    group4.findOne({ID: ID }).exec((err ,product) => {
      //Status length and calculations of distance and pollution from the map
      length = product.status.length - 1;
      tdistance = product.distance + distance;
      if(product.pollutionGeneratedTransport == null){
        product.pollutionGeneratedTransport = 0;
      }
      co2d = 0.001*distance*0.6368;
      co2 = product.pollutionGeneratedTransport + co2d;
      state = product.status[length].status;
    if(lat != null && lat != ""){
      //Add pollution transport to the global variable
      group4.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: co2}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add pollution transport to the state variable
        group4.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.pollutionGeneratedTransport": co2d}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
      //Add new location to the global variable
      group4.findOneAndUpdate(myquery, {$set: {location: [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add new distance to the global variable
        group4.findOneAndUpdate(myquery, {$set: {distance: tdistance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
          }
            console.log(doc);
          });
        //Add new location to the state variable
        group4.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.currentLocation": [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        });
        console.log(co2d);
        //Add new distance to the state variable
        group4.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.distance": distance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });

        req.flash('success_msg','You have now registered the product!');
      }
    });
 }
});


router.post('/group5edit', ensureAuthenticated, async(req, res) => {
  //Normal data variables
   var {ID, status, pollutionGenerated, permissions} = req.body;


  let errors = [];
  //Take the status length value
  group5.findOne({ID: ID }).exec((err ,product) => {
    if (product) {
      length = product.status.length - 1;
    }
  });
  var myquery = {ID: ID};
  await sleep(50);
  
  //In case of error
  if (errors.length > 0) {
    res.render('group5edit', {
      product: Product,
      errors : errors,
      ID: ID,
      pollutionGenerated: pollutionGenerated,
      permissions: permissions,
      status: [
        {ID: ID, status: status, responsible: req.user.email, pollutionGenerated: pollutionGenerated}
      ]})
  } else {

      //Add permissions
    if(permissions!= null && permissions != ""){
      group5.update(myquery, {$push: {permissions: {$each: [permissions], $position: -1}}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
      }
  
      console.log(doc);
      });
    }

    if(status == null || status == ""){
      if(pollutionGenerated != null && pollutionGenerated != ""){
        group5.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
        }
        console.log(doc);
        });
      }
    }else if(status != null && status != ""){
      //Edit status selected
      group5.findOne({ID: ID, "status.status": status}).exec((err, product) => {
        //If status exist
        if(product){
          //Change total pollution from global variables and from the certain status
          if(pollutionGenerated != null && pollutionGenerated != ""){
 
            group5.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log(doc);
            });


            group5.findOneAndUpdate({ID: ID, "status.status": status}, {$set: {"status.$.pollutionGenerated": pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!" + err);
            }
            console.log(doc);
            });
           }
           var pollutionTransport = product.status[length].pollutionGeneratedTransport;
           var distanceTransport = product.status[length].distance;

           console.log("DATA: " + distanceTransport + " DATA: " + pollutionTransport);

           //We have to covert the distance and the pollution transport to 0 in the state, and in the global variable too
           group5.findOne(myquery).exec((err, product) => {

             var pollution = product.pollutionGeneratedTransport - pollutionTransport;
             var distance = product.distance - distanceTransport;

             console.log("DISTANCE: " + distance + " POLLUTION: " + pollution);
             group5.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: pollution}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });

             group5.findOneAndUpdate(myquery, {$set: {distance: distance}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });
           });

        }else{
          //Id status doesnt exist it creates a new status
          group5.findOneAndUpdate(myquery, {$push: {status: {ID: ID, status: status, responsible: req.user.email, pollutionGenerated: pollutionGenerated}}}, {returnOriginal: false}).exec((err ,doc) => {
            if (err) {
              console.log("Something wrong when updating data!");
          }
          console.log(doc);
          });

          //Search and update pollution
          if(pollutionGenerated != null && pollutionGenerated != ""){
          group5.findOne(myquery).exec((err, product) => {
               group5.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
                if (err) {
                  console.log("Something wrong when updating data!");
              }
              console.log(doc);
               });
          });
          }

        }
      })
        
  }
  //It doesn't need a promise. The sleep it's ok
 await sleep(150);

    req.flash('success_msg','UPDATED!');

    //To render the map page, it's important to search for the location of the procoduct
    await group5.findOne({ID: ID}).exec((err,product) =>  {
      console.log('LOCATION: ' + product.location);
      res.render('group5editmap',{
        latlng: JSON.stringify(product.location),
        ID: ID
      });
    })

  }
});

//Map page
router.post('/group5editmap', ensureAuthenticated, (req, res) => {
  //Variables from the ajax post
  var lat = req.body.lat;
  var lng = req.body.lng;
  var distance = req.body.distance;
  var ID = req.body.ID;
  //Variable that we need
  var state, length, tdistance, co2, co2d;
  //Errors
  let errors = [];

  //In case of error
  if (errors.length > 0) {
    res.render('group5editmap', {
      location: [lng, lat]})
  } else {
    var myquery = {ID: ID};
    //Search for Group ID
    group5.findOne({ID: ID }).exec((err ,product) => {
      //Status length and calculations of distance and pollution from the map
      length = product.status.length - 1;
      tdistance = product.distance + distance;
      if(product.pollutionGeneratedTransport == null){
        product.pollutionGeneratedTransport = 0;
      }
      co2d = 0.001*distance*0.6368;
      co2 = product.pollutionGeneratedTransport + co2d;
      state = product.status[length].status;
    if(lat != null && lat != ""){
      //Add pollution transport to the global variable
      group5.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: co2}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add pollution transport to the state variable
        group5.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.pollutionGeneratedTransport": co2d}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
      //Add new location to the global variable
      group5.findOneAndUpdate(myquery, {$set: {location: [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add new distance to the global variable
        group5.findOneAndUpdate(myquery, {$set: {distance: tdistance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
          }
            console.log(doc);
          });
        //Add new location to the state variable
        group5.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.currentLocation": [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        });
        console.log(co2d);
        //Add new distance to the state variable
        group5.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.distance": distance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });

        req.flash('success_msg','You have now registered the product!');
      }
    });
 }
});


router.post('/group6edit', ensureAuthenticated, async(req, res) => {
  //Normal data variables
   var {ID, status, pollutionGenerated, permissions} = req.body;


  let errors = [];
  //Take the status length value
  group6.findOne({ID: ID }).exec((err ,product) => {
    if (product) {
      length = product.status.length - 1;
    }
  });
  var myquery = {ID: ID};
  await sleep(50);
  
  //In case of error
  if (errors.length > 0) {
    res.render('group6edit', {
      product: Product,
      errors : errors,
      ID: ID,
      pollutionGenerated: pollutionGenerated,
      permissions: permissions,
      status: [
        {ID: ID, status: status, responsible: req.user.email, pollutionGenerated: pollutionGenerated}
      ]})
  } else {

      //Add permissions
    if(permissions!= null && permissions != ""){
      group6.update(myquery, {$push: {permissions: {$each: [permissions], $position: -1}}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
      }
  
      console.log(doc);
      });
    }

    if(status == null || status == ""){
      if(pollutionGenerated != null && pollutionGenerated != ""){
        group6.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
        }
        console.log(doc);
        });
      }
    }else if(status != null && status != ""){
      //Edit status selected
      group6.findOne({ID: ID, "status.status": status}).exec((err, product) => {
        //If status exist
        if(product){
          //Change total pollution from global variables and from the certain status
          if(pollutionGenerated != null && pollutionGenerated != ""){
 
            group6.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log(doc);
            });


            group6.findOneAndUpdate({ID: ID, "status.status": status}, {$set: {"status.$.pollutionGenerated": pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!" + err);
            }
            console.log(doc);
            });
           }
           var pollutionTransport = product.status[length].pollutionGeneratedTransport;
           var distanceTransport = product.status[length].distance;

           console.log("DATA: " + distanceTransport + " DATA: " + pollutionTransport);

           //We have to covert the distance and the pollution transport to 0 in the state, and in the global variable too
           group6.findOne(myquery).exec((err, product) => {

             var pollution = product.pollutionGeneratedTransport - pollutionTransport;
             var distance = product.distance - distanceTransport;

             console.log("DISTANCE: " + distance + " POLLUTION: " + pollution);
             group6.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: pollution}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });

             group6.findOneAndUpdate(myquery, {$set: {distance: distance}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });
           });

        }else{
          //Id status doesnt exist it creates a new status
          group6.findOneAndUpdate(myquery, {$push: {status: {ID: ID, status: status, responsible: req.user.email, pollutionGenerated: pollutionGenerated}}}, {returnOriginal: false}).exec((err ,doc) => {
            if (err) {
              console.log("Something wrong when updating data!");
          }
          console.log(doc);
          });

          //Search and update pollution
          if(pollutionGenerated != null && pollutionGenerated != ""){
          group6.findOne(myquery).exec((err, product) => {
               group6.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
                if (err) {
                  console.log("Something wrong when updating data!");
              }
              console.log(doc);
               });
          });
          }

        }
      })
        
  }
  //It doesn't need a promise. The sleep it's ok
 await sleep(150);

    req.flash('success_msg','UPDATED!');

    //To render the map page, it's important to search for the location of the procoduct
    await group6.findOne({ID: ID}).exec((err,product) =>  {
      console.log('LOCATION: ' + product.location);
      res.render('group6editmap',{
        latlng: JSON.stringify(product.location),
        ID: ID
      });
    })

  }
});

//Map page
router.post('/group6editmap', ensureAuthenticated, (req, res) => {
  //Variables from the ajax post
  var lat = req.body.lat;
  var lng = req.body.lng;
  var distance = req.body.distance;
  var ID = req.body.ID;
  //Variable that we need
  var state, length, tdistance, co2, co2d;
  //Errors
  let errors = [];

  //In case of error
  if (errors.length > 0) {
    res.render('group6editmap', {
      location: [lng, lat]})
  } else {
    var myquery = {ID: ID};
    //Search for Group ID
    group6.findOne({ID: ID }).exec((err ,product) => {
      //Status length and calculations of distance and pollution from the map
      length = product.status.length - 1;
      tdistance = product.distance + distance;
      if(product.pollutionGeneratedTransport == null){
        product.pollutionGeneratedTransport = 0;
      }
      co2d = 0.001*distance*0.6368;
      co2 = product.pollutionGeneratedTransport + co2d;
      state = product.status[length].status;
    if(lat != null && lat != ""){
      //Add pollution transport to the global variable
      group6.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: co2}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add pollution transport to the state variable
        group6.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.pollutionGeneratedTransport": co2d}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
      //Add new location to the global variable
      group6.findOneAndUpdate(myquery, {$set: {location: [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add new distance to the global variable
        group6.findOneAndUpdate(myquery, {$set: {distance: tdistance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
          }
            console.log(doc);
          });
        //Add new location to the state variable
        group6.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.currentLocation": [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        });
        console.log(co2d);
        //Add new distance to the state variable
        group6.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.distance": distance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });

        req.flash('success_msg','You have now registered the product!');
      }
    });
        //Time to render the page to add products in the case the actual product use another registered product in the platform
        res.render('product6addedit',{
          ID: ID
        });
 }
});


//Add link between products in some way
router.post('/product6addedit', ensureAuthenticated, async(req, res) => {
  //Data from the form post
  var {ID, busqueda} = req.body;
  //Variable where the products found with the search input are stored.
  var products = new Array();
  var i = 0;
  if(busqueda == null || busqueda == ''){
    res.redirect('/index/indexlogin');
  }

 
    //Search a product with a name similar to the input
    food.find({name: new RegExp(busqueda, 'i')}).exec().then(async(product) => {
      //If it exist, the product is stored in the variable products
      await Promise.all(product.map(async (p) => {
        products[i] = p;
        i++;
      }))
      }).then(() => {
        //Time to render the page displaying the stored products
        res.render('product6showedit', {
          product: products,
          ID: ID
        }); 
      }) 

});

//Show product page
router.post('/product6showedit', ensureAuthenticated, async (req, res) => {
  //Data from the Ajax post
  var usePageProduct = req.body.usePageProduct;
  var ID = req.body.ID;
  var percentage = req.body.percentage;
  //variable to use when it's necessary 
  var myquery = {ID: ID};
  //variable of pollution
  var contamination = 0;
  group6.findOne(myquery).exec().then(async(product) => {
    contamination = contamination + product.pollutionGenerated;
  }).then(() => {
    //Time to search the product selected to link to the main product
    //Search product in food
    food.findOne({ID: usePageProduct}).exec((err, productn) => {
      //If it exist
      if(productn){
      //Data to add about the product selected
      var add = {ID: productn.ID, Name: productn.name};
      //Add product to the list of products
      group6.findOneAndUpdate(myquery, {$push: {usedProducts: add}}, {returnOriginal: false, upsert: true}, (err, doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
      }
      console.log(doc);
      });
      //Change the amount of pollution in the main product
      contamination = contamination + (productn.pollutionGenerated * (percentage/100));
      group6.findOneAndUpdate(myquery, {$set: {pollutionGenerated: contamination}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
      }
      console.log(doc);
      });
      //If it doesn't exist
    }else{
      console.log('No hay producto');
    }
    })
  })
})



router.post('/group7edit', ensureAuthenticated, async(req, res) => {
  //Normal data variables
   var {ID, status, pollutionGenerated, permissions} = req.body;


  let errors = [];
  //Take the status length value
  group7.findOne({ID: ID }).exec((err ,product) => {
    if (product) {
      length = product.status.length - 1;
    }
  });
  var myquery = {ID: ID};
  await sleep(50);
  
  //In case of error
  if (errors.length > 0) {
    res.render('group7edit', {
      product: Product,
      errors : errors,
      ID: ID,
      pollutionGenerated: pollutionGenerated,
      permissions: permissions,
      status: [
        {ID: ID, status: status, responsible: req.user.email, pollutionGenerated: pollutionGenerated}
      ]})
  } else {

      //Add permissions
    if(permissions!= null && permissions != ""){
      group7.update(myquery, {$push: {permissions: {$each: [permissions], $position: -1}}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
      }
  
      console.log(doc);
      });
    }

    if(status == null || status == ""){
      if(pollutionGenerated != null && pollutionGenerated != ""){
        group7.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
        }
        console.log(doc);
        });
      }
    }else if(status != null && status != ""){
      //Edit status selected
      group7.findOne({ID: ID, "status.status": status}).exec((err, product) => {
        //If status exist
        if(product){
          //Change total pollution from global variables and from the certain status
          if(pollutionGenerated != null && pollutionGenerated != ""){
 
            group7.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log(doc);
            });


            group7.findOneAndUpdate({ID: ID, "status.status": status}, {$set: {"status.$.pollutionGenerated": pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
              if (err) {
                console.log("Something wrong when updating data!" + err);
            }
            console.log(doc);
            });
           }
           var pollutionTransport = product.status[length].pollutionGeneratedTransport;
           var distanceTransport = product.status[length].distance;

           console.log("DATA: " + distanceTransport + " DATA: " + pollutionTransport);

           //We have to covert the distance and the pollution transport to 0 in the state, and in the global variable too
           group7.findOne(myquery).exec((err, product) => {

             var pollution = product.pollutionGeneratedTransport - pollutionTransport;
             var distance = product.distance - distanceTransport;

             console.log("DISTANCE: " + distance + " POLLUTION: " + pollution);
             group7.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: pollution}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });

             group7.findOneAndUpdate(myquery, {$set: {distance: distance}}, {returnOriginal: false}).exec((err ,doc) => {
               if (err) {
                 console.log("Something wrong when updating data!");
             }
             });
           });

        }else{
          //Id status doesnt exist it creates a new status
          group7.findOneAndUpdate(myquery, {$push: {status: {ID: ID, status: status, responsible: req.user.email, pollutionGenerated: pollutionGenerated}}}, {returnOriginal: false}).exec((err ,doc) => {
            if (err) {
              console.log("Something wrong when updating data!");
          }
          console.log(doc);
          });

          //Search and update pollution
          if(pollutionGenerated != null && pollutionGenerated != ""){
          group7.findOne(myquery).exec((err, product) => {
               group7.findOneAndUpdate(myquery, {$set: {pollutionGenerated: pollutionGenerated}}, {returnOriginal: false}).exec((err ,doc) => {
                if (err) {
                  console.log("Something wrong when updating data!");
              }
              console.log(doc);
               });
          });
          }

        }
      })
        
  }
  //It doesn't need a promise. The sleep it's ok
 await sleep(150);

    req.flash('success_msg','UPDATED!');

    //To render the map page, it's important to search for the location of the procoduct
    await group7.findOne({ID: ID}).exec((err,product) =>  {
      console.log('LOCATION: ' + product.location);
      res.render('group7editmap',{
        latlng: JSON.stringify(product.location),
        ID: ID
      });
    })

  }
});

//Map page
router.post('/group7editmap', ensureAuthenticated, (req, res) => {
  //Variables from the ajax post
  var lat = req.body.lat;
  var lng = req.body.lng;
  var distance = req.body.distance;
  var ID = req.body.ID;
  //Variable that we need
  var state, length, tdistance, co2, co2d;
  //Errors
  let errors = [];

  //In case of error
  if (errors.length > 0) {
    res.render('group7editmap', {
      location: [lng, lat]})
  } else {
    var myquery = {ID: ID};
    //Search for Group ID
    group7.findOne({ID: ID }).exec((err ,product) => {
      //Status length and calculations of distance and pollution from the map
      length = product.status.length - 1;
      tdistance = product.distance + distance;
      if(product.pollutionGeneratedTransport == null){
        product.pollutionGeneratedTransport = 0;
      }
      co2d = 0.001*distance*0.6368;
      co2 = product.pollutionGeneratedTransport + co2d;
      state = product.status[length].status;
    if(lat != null && lat != ""){
      //Add pollution transport to the global variable
      group7.findOneAndUpdate(myquery, {$set: {pollutionGeneratedTransport: co2}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add pollution transport to the state variable
        group7.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.pollutionGeneratedTransport": co2d}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });
      //Add new location to the global variable
      group7.findOneAndUpdate(myquery, {$set: {location: [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
          console.log(doc);
        });
        //Add new distance to the global variable
        group7.findOneAndUpdate(myquery, {$set: {distance: tdistance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
          }
            console.log(doc);
          });
        //Add new location to the state variable
        group7.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.currentLocation": [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        });
        console.log(co2d);
        //Add new distance to the state variable
        group7.findOneAndUpdate({ID: ID, "status.status": state}, {$set: {"status.$.distance": distance}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });

        req.flash('success_msg','You have now registered the product!');
      }
    });
 }
});
module.exports = router;
