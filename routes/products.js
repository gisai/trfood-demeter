//Express and route
const express = require('express');
const router = express.Router();

const multer = require('multer');
var fs = require('fs');
var path = require('path');
const sharp = require("sharp");

//Authentication config
const {ensureAuthenticated} = require("../config/auth.js");
//DB
var app = require('../app');
var Product = app.Product;
var Group1 = app.Group1;
var Group2 = app.Group2;
var Group3 = app.Group3;
var Group4 = app.Group4;
var Group5 = app.Group5;
var Group6 = app.Group6;
var Group7 = app.Group7;
var Food = app.Food;
var ObjectID = require('mongodb').ObjectID;
//Current time
var datetime = new Date();

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 
//Select the type of product you want to include to the database
router.get('/typeProduct', ensureAuthenticated,(req,res)=> res.render('typeProduct'));

//Group 1 product = Milk and milk derivatives

router.get('/group1', ensureAuthenticated,(req,res)=> res.render('group1'));

router.post('/group1', ensureAuthenticated, async (req, res) => {
  var {ID, corporativeID, shipmentID, name, file ,expiryDate, nutritionalInformation, company, typefood, status} = req.body;

  var distance = 0;
  var contamination = 0;
  //Errors
  let errors = [];

  //Fields complete
  if (!name || !expiryDate || !nutritionalInformation || !status) {
    errors.push({ msg: 'Please enter all fields' });
  }

  //If the user didn't write a company,he is considered a particular 
  if(req.user.company != null){
    company = req.user.company;
  }else{
    company = req.user.email;
  }


  if(typefood == 'Cheese'){
    contamination += 19.5;
  }else{
    contamination += 2.2;
  }
  //Boss ID if necessary
  ID = new ObjectID();
  //ID for the employees
  corporativeID = new ObjectID();
  //Shipment ID
  shipmentID = new ObjectID();
  //First it searchs for the food with the name and company from the input  
  if(name != '' && name != null){
    await Food.findOne({name: name, company: req.user.company}).exec((err,product) => {
    //If it doesn't exist, it's time to create it
      if(!product){
      const product = new Food({
        ID: ID,
        name: name,
        company: req.user.company,
        creator: req.user.email,
        nutritionalInformation: nutritionalInformation,
        availability: true,
        groupFood: 'Group 1',
        pollutionGenerated: contamination,
        products: [shipmentID],
        img: file
      });
      product.save();
    }else{
      //If it exist, it's time to add just the ID from the new product
      Food.update({name: name, company: req.user.company}, {$push: {products: {$each: [shipmentID], $position: -1}}}, {returnOriginal: false}).exec((err ,doc) => {
        if(err){
          console.log("Something wrong when upadting data¿");
        }
      });
    }
    });
  }

  //Compare dates
  if (expiryDate <= datetime) {
    errors.push({ msg: 'The product is already expired' });
  }

  if(name != '' && name != null){
    //It searchs for the food with the name and company from the input again and create the product in the group 1
    Food.findOne({name: name, company: req.user.company}).exec((err,product) => {
      if(product){
      //In case of error
      if (errors.length > 0) {
        res.render('group1', {
          errors : errors,
          ID: shipmentID,
          corporativeID: corporativeID,
          bossID: product.ID,
          distance: distance,
          expiryDate: expiryDate,
          typefood: typefood,
          creator: req.user.email,
          status: [
            {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
          ]})
      } else { 
        Group1.findOne({ ID: shipmentID }).exec((err,product2) => {
          console.log(product2);
          if (product2) {
            errors.push({ msg: 'Product already exists' });
            render(res,errors,ID, corporativeID, shipmentID,availability,composition,expiryDate,nutritionalInformation, pollutionGenerated, creator, company, status);
          } else {
            const newProduct = new Group1({
            ID: shipmentID,
              corporativeID: corporativeID,
              bossID: product.ID,
              distance: distance,
              expiryDate: expiryDate,
              typefood: typefood,
              pollutionGenerated: contamination,
              creator: req.user.email,
              status: [
                {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
              ]
            });

            newProduct.save();
          }
        });
            req.flash('success_msg','You have now registered the product!')

            res.render('group1map',{
              user: req.user,
              ID: shipmentID,
              bossID: product.ID
            });
          }
      }else{
        if (errors.length > 0) {
          res.render('group1', {
            errors : errors,
            ID: shipmentID,
            corporativeID: corporativeID,
            bossID: ID,
            distance: distance,
            expiryDate: expiryDate,
            typefood: typefood,
            creator: req.user.email,
            status: [
              {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
            ]})
        } else { 
          Group1.findOne({ ID: shipmentID }).exec((err,product) => {
            console.log(product);
            if (product) {
              errors.push({ msg: 'Product already exists' });
              render(res,errors,ID, corporativeID, shipmentID,availability,composition,expiryDate,nutritionalInformation, pollutionGenerated, creator, company, status);
            } else {
              const newProduct = new Group1({
              ID: shipmentID,
                corporativeID: corporativeID,
                bossID: ID,
                distance: distance,
                expiryDate: expiryDate,
                typefood: typefood,
                pollutionGenerated: contamination,
                creator: req.user.email,
                status: [
                  {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
                ]
              });
  
              newProduct.save();
            }
          });
              req.flash('success_msg','You have now registered the product!')
  
              res.render('group1map',{
                user: req.user,
                ID: shipmentID,
                bossID: ID
              });
            }
      }
    });
  }
});


var upload = multer({ dest: "public/uploads/" });

router.post('/group1picture', upload.single('image') ,ensureAuthenticated, async (req, res) => {
  const buffer = await sharp(
    path.join(__dirname, `../public/uploads/${req.file.filename}`),
  ).png().toBuffer();
  var ID = req.body.bossID;
  var thumb = new Buffer(buffer).toString('base64');
  await Food.findOneAndUpdate(
    { ID: ID },
    { img: thumb },
  );
  res.redirect('/index/indexlogin');

})

//Group map page, add location to product
router.post('/group1map', ensureAuthenticated, async (req, res) => {
  var lat = req.body.lat;
  var lng = req.body.lng;
  var ID = req.body.ID;
  //Errors
  let errors = [];

  console.log("DATOS: " + lat + "  " + lng + "  " + ID);

  //In case of error
  if (errors.length > 0) {
    res.render('group1map', {
      location: [lng, lat]})
  } else {
    var myquery = {ID: ID};
    //Search product 
    await Group1.findOne(myquery).exec((err ,product) => {
      //In case it exist
      if(product){
      if(lat != null && lat != ""){
        //Add location to global location (Last)
        Group1.findOneAndUpdate(myquery, {$set: {location: [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" );
        }
        console.log(doc);
        });
        //Add location to state
        Group1.findOneAndUpdate({ID: ID, "status.ID": ID}, {$set: {"status.$.currentLocation": [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });

      }
      }
    });
    req.flash('success_msg','You have now registered the product!');

 }
});

//Group 2 product = Meat, fish and eggs

router.get('/group2', ensureAuthenticated,(req,res)=> res.render('group2'));


router.post('/group2', ensureAuthenticated, async (req, res) => {
  var { ID, corporativeID, shipmentID, name, expiryDate, nutritionalInformation, company, typefood,status} = req.body;
  
  //Errors
  let errors = [];

  //If the user didn't write a company,he is considered a particular 
  if(req.user.company != null){
   company = req.user.company;
  }else{
   company = req.user.email;
  }
  var distance = 0;
  var contamination = 0;
  //Boss ID
  ID = new ObjectID();
  //ID for the employees
  corporativeID = new ObjectID();
  //Shipment ID
  shipmentID = new ObjectID();

  if(typefood == 'Beef Herd'){
    contamination += 57.5;
  }else if(typefood == 'Dairy Herd'){
    contamination += 19.52;
  }else if(typefood == 'Sheep'){
    contamination += 37.7;
  }else if(typefood == 'Goat'){
    contamination += 37.7;
  }else if(typefood == 'Lamb'){
    contamination += 19.2;
  }else if(typefood == 'Pig'){
    contamination += 6.4;
  }else if(typefood == 'Chicken'){
    contamination += 4.75;
  }else if(typefood == 'Fish farmed'){
    contamination += 4.9;
  }else if(typefood == 'Fish wild'){
    contamination += 2.63;
  }else if(typefood == 'Eggs'){
    contamination += 4.2;
  }else if(typefood == 'Other Meat'){
    contamination += 20.0;
  }

  //First it searchs for the food with the name and company from the input  
  if(name != '' && name != null){
    await Food.findOne({name: name, company: req.user.company}).exec((err,product) => {
    //If it doesn't exist, it's time to create it
      if(!product){
      const product = new Food({
        ID: ID,
        name: name,
        company: req.user.company,
        creator: req.user.email,
        nutritionalInformation: nutritionalInformation,
        availability: true,
        groupFood: 'Group 2',
        pollutionGenerated: contamination,
        products: [shipmentID]
      });
      product.save();
    }else{
      //If it exist, it's time to add just the ID from the new product
      Food.update({name: name, company: req.user.company}, {$push: {products: {$each: [shipmentID], $position: -1}}}, {returnOriginal: false}).exec((err ,doc) => {
        if(err){
          console.log("Something wrong when upadting data¿");
        }
      });
    }
    });
  }

  //Fields complete
  if (!name || !expiryDate || !nutritionalInformation || !status) {
    errors.push({ msg: 'Please enter all fields' });
  }

  //Compare dates
  if (expiryDate <= datetime) {
    errors.push({ msg: 'The product is already expired' });
  }

  if(name != '' && name != null){
    //It searchs for the food with the name and company from the input again and create the product in the group 1
    Food.findOne({name: name, company: req.user.company}).exec((err,product) => {
      if(product){
      //In case of error
      if (errors.length > 0) {
        res.render('group2', {
          errors : errors,
          ID: shipmentID,
          corporativeID: corporativeID,
          bossID: product.ID,
          distance: distance,
          expiryDate: expiryDate,
          typefood: typefood,
          creator: req.user.email,
          status: [
            {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
          ]})
      } else { 
        Group2.findOne({ ID: shipmentID }).exec((err,product2) => {
          console.log(product2);
          if (product2) {
            errors.push({ msg: 'Product already exists' });
            render(res,errors,ID, corporativeID, shipmentID,availability,composition,expiryDate,nutritionalInformation, pollutionGenerated, creator, company, status);
          } else {
            const newProduct = new Group2({
            ID: shipmentID,
              corporativeID: corporativeID,
              bossID: product.ID,
              distance: distance,
              expiryDate: expiryDate,
              typefood: typefood,
              pollutionGenerated: contamination,
              creator: req.user.email,
              status: [
                {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
              ]
            });

            newProduct.save();
          }
        });
            req.flash('success_msg','You have now registered the product!')

            res.render('group2map',{
              user: req.user,
              ID: shipmentID,
              bossID: product.ID
            });
          }
      }else{
        if (errors.length > 0) {
          res.render('group2', {
            errors : errors,
            ID: shipmentID,
            corporativeID: corporativeID,
            bossID: ID,
            distance: distance,
            expiryDate: expiryDate,
            typefood: typefood,
            creator: req.user.email,
            status: [
              {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
            ]})
        } else { 
          Group2.findOne({ ID: shipmentID }).exec((err,product) => {
            console.log(product);
            if (product) {
              errors.push({ msg: 'Product already exists' });
              render(res,errors,ID, corporativeID, shipmentID,availability,composition,expiryDate,nutritionalInformation, pollutionGenerated, creator, company, status);
            } else {
              const newProduct = new Group2({
              ID: shipmentID,
                corporativeID: corporativeID,
                bossID: ID,
                distance: distance,
                expiryDate: expiryDate,
                typefood: typefood,
                pollutionGenerated: contamination,
                creator: req.user.email,
                status: [
                  {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
                ]
              });
  
              newProduct.save();
            }
          });
              req.flash('success_msg','You have now registered the product!')
  
              res.render('group2map',{
                user: req.user,
                ID: shipmentID,
                bossID: ID
              });
            }
      }
    });
  }
});

router.post('/group2picture', upload.single('image') ,ensureAuthenticated, async (req, res) => {
  const buffer = await sharp(
    path.join(__dirname, `../public/uploads/${req.file.filename}`),
  ).png().toBuffer();
  var ID = req.body.bossID;
  var thumb = new Buffer(buffer).toString('base64');
  await Food.findOneAndUpdate(
    { ID: ID },
    { img: thumb },
  );
  res.redirect('/index/indexlogin');

})

//Group map page, add location to product
router.post('/group2map', ensureAuthenticated, async (req, res) => {
  var lat = req.body.lat;
  var lng = req.body.lng;
  var ID = req.body.ID;
  //Errors
  let errors = [];

  console.log("DATOS: " + lat + "  " + lng + "  " + ID);

  //In case of error
  if (errors.length > 0) {
    res.render('group2map', {
      location: [lng, lat]})
  } else {
    var myquery = {ID: ID};
    //Search product 
    await Group2.findOne(myquery).exec((err ,product) => {
      //In case it exist
      if(product){
      if(lat != null && lat != ""){
        //Add location to global location (Last)
        Group2.findOneAndUpdate(myquery, {$set: {location: [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" );
        }
        console.log(doc);
        });
        //Add location to state
        Group2.findOneAndUpdate({ID: ID, "status.ID": ID}, {$set: {"status.$.currentLocation": [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });

      }
      }
    });
    req.flash('success_msg','You have now registered the product!');

 }
});

//Group 3 product = Potatoes, pulses, nuts

router.get('/group3', ensureAuthenticated,(req,res)=> res.render('group3'));


router.post('/group3', ensureAuthenticated, async (req, res) => {
  var { ID, corporativeID, shipmentID, name, expiryDate, nutritionalInformation, company, typefood,status} = req.body;

  //Errors
  let errors = [];
  var distance = 0;
  var contamination = 0;

  //If the user didn't write a company,he is considered a particular 
  if(req.user.company != null){
    company = req.user.company;
  }else{
    company = req.user.email;
  }

  //public ID
  ID = new ObjectID();
  //ID for the employees
  corporativeID = new ObjectID();
  //Shipment ID
  shipmentID = new ObjectID();

  //Fields complete
  if (!name || !expiryDate || !nutritionalInformation || !status) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if(typefood == 'Nuts'){
    contamination += 0.1;
  }else if(typefood == 'Potatoes'){
    contamination += 0.5;
  }else{
    contamination += 0.1;
  }

//First it searchs for the food with the name and company from the input  
if(name != '' && name != null){
  await Food.findOne({name: name, company: req.user.company}).exec((err,product) => {
  //If it doesn't exist, it's time to create it
    if(!product){
    const product = new Food({
      ID: ID,
      name: name,
      company: req.user.company,
      creator: req.user.email,
      nutritionalInformation: nutritionalInformation,
      availability: true,
      groupFood: 'Group 3',
      pollutionGenerated: contamination,
      products: [shipmentID]
    });
    product.save();
  }else{
    //If it exist, it's time to add just the ID from the new product
    Food.update({name: name, company: req.user.company}, {$push: {products: {$each: [shipmentID], $position: -1}}}, {returnOriginal: false}).exec((err ,doc) => {
      if(err){
        console.log("Something wrong when upadting data¿");
      }
    });
  }
  });
}

  //Compare dates
  if (expiryDate <= datetime) {
    errors.push({ msg: 'The product is already expired' });
  }

  if(name != '' && name != null){
    //It searchs for the food with the name and company from the input again and create the product in the group 1
    Food.findOne({name: name, company: req.user.company}).exec((err,product) => {
      if(product){
      //In case of error
      if (errors.length > 0) {
        res.render('group3', {
          errors : errors,
          ID: shipmentID,
          corporativeID: corporativeID,
          bossID: product.ID,
          distance: distance,
          expiryDate: expiryDate,
          typefood: typefood,
          creator: req.user.email,
          status: [
            {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
          ]})
      } else { 
        Group3.findOne({ ID: shipmentID }).exec((err,product2) => {
          console.log(product2);
          if (product2) {
            errors.push({ msg: 'Product already exists' });
            render(res,errors,ID, corporativeID, shipmentID,availability,composition,expiryDate,nutritionalInformation, pollutionGenerated, creator, company, status);
          } else {
            const newProduct = new Group3({
            ID: shipmentID,
              corporativeID: corporativeID,
              bossID: product.ID,
              distance: distance,
              expiryDate: expiryDate,
              typefood: typefood,
              pollutionGenerated: contamination,
              creator: req.user.email,
              status: [
                {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
              ]
            });

            newProduct.save();
          }
        });
            req.flash('success_msg','You have now registered the product!')

            res.render('group3map',{
              user: req.user,
              ID: shipmentID,
              bossID: product.ID
            });
          }
      }else{
        if (errors.length > 0) {
          res.render('group3', {
            errors : errors,
            ID: shipmentID,
            corporativeID: corporativeID,
            bossID: ID,
            distance: distance,
            expiryDate: expiryDate,
            typefood: typefood,
            creator: req.user.email,
            status: [
              {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
            ]})
        } else { 
          Group3.findOne({ ID: shipmentID }).exec((err,product) => {
            console.log(product);
            if (product) {
              errors.push({ msg: 'Product already exists' });
              render(res,errors,ID, corporativeID, shipmentID,availability,composition,expiryDate,nutritionalInformation, pollutionGenerated, creator, company, status);
            } else {
              const newProduct = new Group3({
              ID: shipmentID,
                corporativeID: corporativeID,
                bossID: ID,
                distance: distance,
                expiryDate: expiryDate,
                typefood: typefood,
                pollutionGenerated: contamination,
                creator: req.user.email,
                status: [
                  {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
                ]
              });
  
              newProduct.save();
            }
          });
              req.flash('success_msg','You have now registered the product!')
  
              res.render('group3map',{
                user: req.user,
                ID: shipmentID,
                bossID: ID
              });
            }
      }
    });
  }
});

router.post('/group3picture', upload.single('image') ,ensureAuthenticated, async (req, res) => {
  const buffer = await sharp(
    path.join(__dirname, `../public/uploads/${req.file.filename}`),
  ).png().toBuffer();
  var ID = req.body.bossID;
  var thumb = new Buffer(buffer).toString('base64');
  await Food.findOneAndUpdate(
    { ID: ID },
    { img: thumb },
  );
  res.redirect('/index/indexlogin');

})

//Group map page, add location to product
router.post('/group3map', ensureAuthenticated, async (req, res) => {
  var lat = req.body.lat;
  var lng = req.body.lng;
  var ID = req.body.ID;
  //Errors
  let errors = [];

  console.log("DATOS: " + lat + "  " + lng + "  " + ID);

  //In case of error
  if (errors.length > 0) {
    res.render('group3map', {
      location: [lng, lat]})
  } else {
    var myquery = {ID: ID};
    //Search product 
    await Group3.findOne(myquery).exec((err ,product) => {
      //In case it exist
      if(product){
      if(lat != null && lat != ""){
        //Add location to global location (Last)
        Group3.findOneAndUpdate(myquery, {$set: {location: [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" );
        }
        console.log(doc);
        });
        //Add location to state
        Group3.findOneAndUpdate({ID: ID, "status.ID": ID}, {$set: {"status.$.currentLocation": [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });

      }
      }
    });
    req.flash('success_msg','You have now registered the product!');

 }
});


//Group 4 product = Vegetables

router.get('/group4', ensureAuthenticated,(req,res)=> res.render('group4'));


router.post('/group4', ensureAuthenticated, async (req, res) => {
  var { ID, corporativeID, shipmentID, name, expiryDate, nutritionalInformation, company,status} = req.body;

  //Errors
  let errors = [];
  var distance = 0;
  var contamination = 0.8;

  //If the user didn't write a company,he is considered a particular 
  if(req.user.company != null){
   company = req.user.company;
  }else{
   company = req.user.email;
  }
  //public ID
  ID = new ObjectID();
  //ID for the employees
  corporativeID = new ObjectID();
  //Shipment ID
  shipmentID = new ObjectID();

 //First it searchs for the food with the name and company from the input  
 if(name != '' && name != null){
   await Food.findOne({name: name, company: req.user.company}).exec((err,product) => {
   //If it doesn't exist, it's time to create it
     if(!product){
     const product = new Food({
       ID: ID,
       name: name,
       company: req.user.company,
       creator: req.user.email,
       nutritionalInformation: nutritionalInformation,
       availability: true,
       groupFood: 'Group 4',
       pollutionGenerated: contamination,
       products: [shipmentID]
     });
     product.save();
   }else{
     //If it exist, it's time to add just the ID from the new product
     Food.update({name: name, company: req.user.company}, {$push: {products: {$each: [shipmentID], $position: -1}}}, {returnOriginal: false}).exec((err ,doc) => {
       if(err){
         console.log("Something wrong when upadting data¿");
       }
     });
   }
   });
 }

  //Fields complete
  if (!name || !expiryDate || !nutritionalInformation || !status) {
    errors.push({ msg: 'Please enter all fields' });
  }

  //Compare dates
  if (expiryDate <= datetime) {
    errors.push({ msg: 'The product is already expired' });
  }

  if(name != '' && name != null){
    //It searchs for the food with the name and company from the input again and create the product in the group 1
    Food.findOne({name: name, company: req.user.company}).exec((err,product) => {
      if(product){
      //In case of error
      if (errors.length > 0) {
        res.render('group4', {
          errors : errors,
          ID: shipmentID,
          corporativeID: corporativeID,
          bossID: product.ID,
          distance: distance,
          expiryDate: expiryDate,
          creator: req.user.email,
          status: [
            {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
          ]})
      } else { 
        Group4.findOne({ ID: shipmentID }).exec((err,product2) => {
          if (product2) {
            errors.push({ msg: 'Product already exists' });
            render(res,errors,ID, corporativeID, shipmentID,availability,composition,expiryDate,nutritionalInformation, pollutionGenerated, creator, company, status);
          } else {
            const newProduct = new Group4({
            ID: shipmentID,
              corporativeID: corporativeID,
              bossID: product.ID,
              distance: distance,
              expiryDate: expiryDate,
              pollutionGenerated: contamination,
              creator: req.user.email,
              status: [
                {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
              ]
            });

            newProduct.save();
          }
        });
            req.flash('success_msg','You have now registered the product!')

            res.render('group4map',{
              user: req.user,
              ID: shipmentID,
              bossID: product.ID
            });
          }
      }else{
        if (errors.length > 0) {
          res.render('group4', {
            errors : errors,
            ID: shipmentID,
            corporativeID: corporativeID,
            bossID: ID,
            distance: distance,
            expiryDate: expiryDate,
            creator: req.user.email,
            status: [
              {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
            ]})
        } else { 
          Group4.findOne({ ID: shipmentID }).exec((err,product) => {
            console.log(product);
            if (product) {
              errors.push({ msg: 'Product already exists' });
              render(res,errors,ID, corporativeID, shipmentID,availability,composition,expiryDate,nutritionalInformation, pollutionGenerated, creator, company, status);
            } else {
              const newProduct = new Group4({
              ID: shipmentID,
                corporativeID: corporativeID,
                bossID: ID,
                distance: distance,
                expiryDate: expiryDate,
                pollutionGenerated: contamination,
                creator: req.user.email,
                status: [
                  {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
                ]
              });
  
              newProduct.save();
            }
          });
              req.flash('success_msg','You have now registered the product!')
  
              res.render('group4map',{
                user: req.user,
                ID: shipmentID,
                bossID: ID
              });
            }
      }
    });
  }
});

router.post('/group4picture', upload.single('image') ,ensureAuthenticated, async (req, res) => {
  const buffer = await sharp(
    path.join(__dirname, `../public/uploads/${req.file.filename}`),
  ).png().toBuffer();
  var ID = req.body.bossID;
  var thumb = new Buffer(buffer).toString('base64');
  await Food.findOneAndUpdate(
    { ID: ID },
    { img: thumb },
  );
  res.redirect('/index/indexlogin');

})

//Group map page, add location to product
router.post('/group4map', ensureAuthenticated, async (req, res) => {
  var lat = req.body.lat;
  var lng = req.body.lng;
  var ID = req.body.ID;
  //Errors
  let errors = [];

  console.log("DATOS: " + lat + "  " + lng + "  " + ID);

  //In case of error
  if (errors.length > 0) {
    res.render('group4map', {
      location: [lng, lat]})
  } else {
    var myquery = {ID: ID};
    //Search product 
    await Group4.findOne(myquery).exec((err ,product) => {
      //In case it exist
      if(product){
      if(lat != null && lat != ""){
        //Add location to global location (Last)
        Group4.findOneAndUpdate(myquery, {$set: {location: [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" );
        }
        console.log(doc);
        });
        //Add location to state
        Group4.findOneAndUpdate({ID: ID, "status.ID": ID}, {$set: {"status.$.currentLocation": [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });

      }
      }
    });
    req.flash('success_msg','You have now registered the product!');

 }
});


//Group 5 product = Fruits

router.get('/group5', ensureAuthenticated,(req,res)=> res.render('group5'));


router.post('/group5', ensureAuthenticated, async (req, res) => {
  var { ID, corporativeID, shipmentID, name, expiryDate, nutritionalInformation, company, status} = req.body;


  //Errors
  let errors = [];
  var distance = 0;
  var contamination = 0.55;

  //If the user didn't write a company,he is considered a particular 
  if(req.user.company != null){
    company = req.user.company;
  }else{
    company = req.user.email;
  }

  //public ID
  ID = new ObjectID();
  //ID for the employees
  corporativeID = new ObjectID();
  //Shipment ID
  shipmentID = new ObjectID();
  //First it searchs for the food with the name and company from the input  
  if(name != '' && name != null){
    await Food.findOne({name: name, company: req.user.company}).exec((err,product) => {
    //If it doesn't exist, it's time to create it
      if(!product){
      const product = new Food({
        ID: ID,
        name: name,
        company: req.user.company,
        creator: req.user.email,
        nutritionalInformation: nutritionalInformation,
        availability: true,
        groupFood: 'Group 5',
        pollutionGenerated: contamination,
        products: [shipmentID]
      });
      product.save();
    }else{
      //If it exist, it's time to add just the ID from the new product
      Food.update({name: name, company: req.user.company}, {$push: {products: {$each: [shipmentID], $position: -1}}}, {returnOriginal: false}).exec((err ,doc) => {
        if(err){
          console.log("Something wrong when upadting data¿");
        }
      });
    }
    });
  }

  //Fields complete
  if (!name || !expiryDate || !nutritionalInformation || !status) {
    errors.push({ msg: 'Please enter all fields' });
  }

  //Compare dates
  if (expiryDate <= datetime) {
    errors.push({ msg: 'The product is already expired' });
  }
  if(name != '' && name != null){
    //It searchs for the food with the name and company from the input again and create the product in the group 1
    Food.findOne({name: name, company: req.user.company}).exec((err,product) => {
      if(product){
      //In case of error
      if (errors.length > 0) {
        res.render('group5', {
          errors : errors,
          ID: shipmentID,
          corporativeID: corporativeID,
          bossID: product.ID,
          distance: distance,
          expiryDate: expiryDate,
          creator: req.user.email,
          status: [
            {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
          ]})
      } else { 
        Group5.findOne({ ID: shipmentID }).exec((err,product2) => {
          if (product2) {
            errors.push({ msg: 'Product already exists' });
            render(res,errors,ID, corporativeID, shipmentID,availability,composition,expiryDate,nutritionalInformation, pollutionGenerated, creator, company, status);
          } else {
            const newProduct = new Group5({
            ID: shipmentID,
              corporativeID: corporativeID,
              bossID: product.ID,
              distance: distance,
              expiryDate: expiryDate,
              pollutionGenerated: contamination,
              creator: req.user.email,
              status: [
                {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
              ]
            });

            newProduct.save();
          }
        });
            req.flash('success_msg','You have now registered the product!')

            res.render('group5map',{
              user: req.user,
              ID: shipmentID,
              bossID: product.ID
            });
          }
      }else{
        if (errors.length > 0) {
          res.render('group5', {
            errors : errors,
            ID: shipmentID,
            corporativeID: corporativeID,
            bossID: ID,
            distance: distance,
            expiryDate: expiryDate,
            creator: req.user.email,
            status: [
              {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
            ]})
        } else { 
          Group5.findOne({ ID: shipmentID }).exec((err,product) => {
            if (product) {
              errors.push({ msg: 'Product already exists' });
              render(res,errors,ID, corporativeID, shipmentID,availability,composition,expiryDate,nutritionalInformation, pollutionGenerated, creator, company, status);
            } else {
              const newProduct = new Group5({
              ID: shipmentID,
                corporativeID: corporativeID,
                bossID: ID,
                distance: distance,
                expiryDate: expiryDate,
                pollutionGenerated: contamination,
                creator: req.user.email,
                status: [
                  {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
                ]
              });
  
              newProduct.save();
            }
          });
              req.flash('success_msg','You have now registered the product!')
  
              res.render('group5map',{
                user: req.user,
                ID: shipmentID,
                bossID: ID
              });
            }
      }
    });
  }
});

router.post('/group5picture', upload.single('image') ,ensureAuthenticated, async (req, res) => {
  const buffer = await sharp(
    path.join(__dirname, `../public/uploads/${req.file.filename}`),
  ).png().toBuffer();
  var ID = req.body.bossID;
  var thumb = new Buffer(buffer).toString('base64');
  await Food.findOneAndUpdate(
    { ID: ID },
    { img: thumb },
  );
  res.redirect('/index/indexlogin');

})

//Group map page, add location to product
router.post('/group5map', ensureAuthenticated, async (req, res) => {
  var lat = req.body.lat;
  var lng = req.body.lng;
  var ID = req.body.ID;
  //Errors
  let errors = [];

  console.log("DATOS: " + lat + "  " + lng + "  " + ID);

  //In case of error
  if (errors.length > 0) {
    res.render('group5map', {
      location: [lng, lat]})
  } else {
    var myquery = {ID: ID};
    //Search product 
    await Group5.findOne(myquery).exec((err ,product) => {
      //In case it exist
      if(product){
      if(lat != null && lat != ""){
        //Add location to global location (Last)
        Group5.findOneAndUpdate(myquery, {$set: {location: [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" );
        }
        console.log(doc);
        });
        //Add location to state
        Group5.findOneAndUpdate({ID: ID, "status.ID": ID}, {$set: {"status.$.currentLocation": [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });

      }
      }
    });
    req.flash('success_msg','You have now registered the product!');

 }
});


//Group 6 product = Cereals and derivatives, sugar and sweets

router.get('/group6', ensureAuthenticated,(req,res)=> res.render('group6'));


router.post('/group6', ensureAuthenticated, async (req, res) => {
  var { ID, corporativeID, shipmentID, name, composition, expiryDate, nutritionalInformation, company, typefood,status} = req.body;
  //Errors
  let errors = [];
  var distance = 0;
  var contamination = 0;
  //If the user didn't write a company,he is considered a particular 
  if(req.user.company != null){
    company = req.user.company;
  }else{
    company = req.user.email;
  }
  //boss ID
  ID = new ObjectID();
  //ID for the employees
  corporativeID = new ObjectID();
  //Shipment ID
  shipmentID = new ObjectID();

  if(typefood == 'Rice'){
    contamination += 3.91; 
  }else if(typefood == 'Wheat'){
    contamination += 1.4;
  }else if(typefood == 'Sugar'){
    contamination += 1.2;
  }else{
  contamination += 2.1;
  }

  //First it searchs for the food with the name and company from the input  
  if(name != '' && name != null){
    await Food.findOne({name: name, company: req.user.company}).exec((err,product) => {
    //If it doesn't exist, it's time to create it
      if(!product){
      const product = new Food({
        ID: ID,
        name: name,
        company: req.user.company,
        creator: req.user.email,
        nutritionalInformation: nutritionalInformation,
        availability: true,
        groupFood: 'Group 6',
        pollutionGenerated: contamination,
        products: [shipmentID]
      });
      product.save();
    }else{
      //If it exist, it's time to add just the ID from the new product
      Food.update({name: name, company: req.user.company}, {$push: {products: {$each: [shipmentID], $position: -1}}}, {returnOriginal: false}).exec((err ,doc) => {
        if(err){
          console.log("Something wrong when upadting data¿");
        }
      });
    }
    });
  }

  //Fields complete
  if (!name || !expiryDate || !nutritionalInformation || !status) {
    errors.push({ msg: 'Please enter all fields' });
  }

  //Compare dates
  if (expiryDate <= datetime) {
    errors.push({ msg: 'The product is already expired' });
  }

  if(name != '' && name != null){
    //It searchs for the food with the name and company from the input again and create the product in the group 1
    Food.findOne({name: name, company: req.user.company}).exec((err,product) => {
      if(product){
      //In case of error
      if (errors.length > 0) {
        res.render('group6', {
          errors : errors,
          ID: shipmentID,
          corporativeID: corporativeID,
          bossID: product.ID,
          distance: distance,
          expiryDate: expiryDate,
          typefood: typefood,
          creator: req.user.email,
          status: [
            {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
          ]})
      } else { 
        Group6.findOne({ ID: shipmentID }).exec((err,product2) => {
          console.log(product2);
          if (product2) {
            errors.push({ msg: 'Product already exists' });
            render(res,errors,ID, corporativeID, shipmentID,availability,composition,expiryDate,nutritionalInformation, pollutionGenerated, creator, company, status);
          } else {
            const newProduct = new Group6({
            ID: shipmentID,
              corporativeID: corporativeID,
              bossID: product.ID,
              distance: distance,
              expiryDate: expiryDate,
              typefood: typefood,
              pollutionGenerated: contamination,
              creator: req.user.email,
              status: [
                {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
              ]
            });

            newProduct.save();
          }
        });
            req.flash('success_msg','You have now registered the product!')

            res.render('group6map',{
              user: req.user,
              ID: shipmentID,
              bossID: product.ID
            });
          }
      }else{
        if (errors.length > 0) {
          res.render('group6', {
            errors : errors,
            ID: shipmentID,
            corporativeID: corporativeID,
            bossID: ID,
            distance: distance,
            expiryDate: expiryDate,
            typefood: typefood,
            creator: req.user.email,
            status: [
              {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
            ]})
        } else { 
          Group6.findOne({ ID: shipmentID }).exec((err,product) => {
            console.log(product);
            if (product) {
              errors.push({ msg: 'Product already exists' });
              render(res,errors,ID, corporativeID, shipmentID,availability,composition,expiryDate,nutritionalInformation, pollutionGenerated, creator, company, status);
            } else {
              const newProduct = new Group6({
              ID: shipmentID,
                corporativeID: corporativeID,
                bossID: ID,
                distance: distance,
                expiryDate: expiryDate,
                typefood: typefood,
                pollutionGenerated: contamination,
                creator: req.user.email,
                status: [
                  {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
                ]
              });
  
              newProduct.save();
            }
          });
              req.flash('success_msg','You have now registered the product!')
  
              res.render('group6map',{
                user: req.user,
                ID: shipmentID,
                bossID: ID
              });
            }
      }
    });
  }
});

router.post('/group6picture', upload.single('image') ,ensureAuthenticated, async (req, res) => {
  const buffer = await sharp(
    path.join(__dirname, `../public/uploads/${req.file.filename}`),
  ).png().toBuffer();
  var ID = req.body.bossID;
  var thumb = new Buffer(buffer).toString('base64');
  await Food.findOneAndUpdate(
    { ID: ID },
    { img: thumb },
  );

})

//Group map page, add location to product
router.post('/group6map', ensureAuthenticated, async (req, res) => {
  var lat = req.body.lat;
  var lng = req.body.lng;
  var ID = req.body.ID;
  //Errors
  let errors = [];

  console.log("DATOS: " + lat + "  " + lng + "  " + ID);

  //In case of error
  if (errors.length > 0) {
    res.render('group6map', {
      location: [lng, lat]})
  } else {
    var myquery = {ID: ID};
    //Search product 
    await Group6.findOne(myquery).exec((err ,product) => {
      //In case it exist
      if(product){
      if(lat != null && lat != ""){
        //Add location to global location (Last)
        Group6.findOneAndUpdate(myquery, {$set: {location: [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" );
        }
        console.log(doc);
        });
        //Add location to state
        Group6.findOneAndUpdate({ID: ID, "status.ID": ID}, {$set: {"status.$.currentLocation": [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });

      }
      }
    });
    req.flash('success_msg','You have now registered the product!');
    //Time to render the page to add products in the case the actual product use another registered product in the platform
    res.render('product6add',{
      ID: ID
    });
 }
});
//Add link between products in some way
router.post('/product6add', ensureAuthenticated, async(req, res) => {
  //Data from the form post
  var {ID, busqueda} = req.body;
  if(busqueda == null || busqueda == ''){
    res.redirect('/index/indexlogin');
  }
  //Variable where the products found with the search input are stored.
  var products = new Array();
  var i = 0;
    //Search a product with a name similar to the input
    Food.find({name: new RegExp(busqueda, 'i')}).exec().then(async(product) => {
      //If it exist, the product is stored in the variable products
      await Promise.all(product.map(async (p) => {
        products[i] = p;
        i++;
      }))
      }).then(() => {
        //Time to render the page displaying the stored products
        res.render('product6show', {
         product: products,
         ID: ID
        }); 
      }) 
})

//Show product page
router.post('/product6show', ensureAuthenticated, async (req, res) => {
  //Data from the Ajax post
  var usePageProduct = req.body.usePageProduct;
  var ID = req.body.ID;
  var percentage = req.body.percentage;
  //variable to use when it's necessary 
  var myquery = {ID: ID};
  //variable of pollution
  var contamination = 0;
  Group6.findOne(myquery).exec().then(async(product) => {
    contamination = contamination + product.pollutionGenerated;
  }).then(() => {
    //Time to search the product selected to link to the main product
    //Search product in food
    Food.findOne({ID: usePageProduct}).exec((err, productn) => {
      //If it exist
      if(productn){
      //Data to add about the product selected
      var add = {ID: productn.ID, Name: productn.name};
      //Add product to the list of products
      Group6.findOneAndUpdate(myquery, {$push: {usedProducts: add}}, {returnOriginal: false, upsert: true}).exec((err ,doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
      }
      console.log(doc);
      });
      //Change the amount of pollution in the main product
      contamination = contamination + (productn.pollutionGenerated * (percentage/100));
      Group6.findOneAndUpdate(myquery, {$set: {pollutionGenerated: contamination}}, {returnOriginal: false}).exec((err ,doc) => {
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




//Group 7 product = Fats, oil and butter

router.get('/group7', ensureAuthenticated,(req,res)=> res.render('group7'));


router.post('/group7', ensureAuthenticated, async (req, res) => {
  var { ID, corporativeID, shipmentID, name, composition, expiryDate, nutritionalInformation, company, typefood,status} = req.body;

  //Errors
  let errors = [];
  var distance = 0;
  var contamination = 0;

  //If the user didn't write a company,he is considered a particular 
  if(req.user.company != null){
    company = req.user.company;
  }else{
    company = req.user.email;
  }

  //public ID
  ID = new ObjectID();
  //ID for the employees
  corporativeID = new ObjectID();
  //Shipment ID
  shipmentID = new ObjectID();

  if(typefood == 'Palm Oil'){
    contamination += 5.1;
  }else if(typefood == 'Olive Oil'){
    contamination += 3.3;
  }else if(typefood == 'Butter'){
    contamination += 9.1;
  }else if(typefood == 'Margarine'){
    contamination += 0.96;
  }else{
    contamination += 4.61;
  }

  //First it searchs for the food with the name and company from the input  
  if(name != '' && name != null){
    await Food.findOne({name: name, company: req.user.company}).exec((err,product) => {
    //If it doesn't exist, it's time to create it
      if(!product){
      const product = new Food({
        ID: ID,
        name: name,
        company: req.user.company,
        creator: req.user.email,
        nutritionalInformation: nutritionalInformation,
        availability: true,
        groupFood: 'Group 7',
        pollutionGenerated: contamination,
        products: [shipmentID]
      });
      product.save();
    }else{
      //If it exist, it's time to add just the ID from the new product
      Food.update({name: name, company: req.user.company}, {$push: {products: {$each: [shipmentID], $position: -1}}}, {returnOriginal: false}).exec((err ,doc) => {
        if(err){
          console.log("Something wrong when upadting data¿");
        }
      });
    }
    });
  }

  //Fields complete
  if (!name || !expiryDate || !nutritionalInformation || !status) {
    errors.push({ msg: 'Please enter all fields' });
  }

  //Compare dates
  if (expiryDate <= datetime) {
    errors.push({ msg: 'The product is already expired' });
  }

  if(name != '' && name != null){
    //It searchs for the food with the name and company from the input again and create the product in the group 1
    Food.findOne({name: name, company: req.user.company}).exec((err,product) => {
      if(product){
      //In case of error
      if (errors.length > 0) {
        res.render('group7', {
          errors : errors,
          ID: shipmentID,
          corporativeID: corporativeID,
          bossID: product.ID,
          distance: distance,
          expiryDate: expiryDate,
          typefood: typefood,
          creator: req.user.email,
          status: [
            {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
          ]})
      } else { 
        Group7.findOne({ ID: shipmentID }).exec((err,product2) => {
          console.log(product2);
          if (product2) {
            errors.push({ msg: 'Product already exists' });
            render(res,errors,ID, corporativeID, shipmentID,availability,composition,expiryDate,nutritionalInformation, pollutionGenerated, creator, company, status);
          } else {
            const newProduct = new Group7({
            ID: shipmentID,
              corporativeID: corporativeID,
              bossID: product.ID,
              distance: distance,
              expiryDate: expiryDate,
              typefood: typefood,
              pollutionGenerated: contamination,
              creator: req.user.email,
              status: [
                {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
              ]
            });

            newProduct.save();
          }
        });
            req.flash('success_msg','You have now registered the product!')

            res.render('group7map',{
              user: req.user,
              ID: shipmentID,
              bossID: product.ID
            });
          }
      }else{
        if (errors.length > 0) {
          res.render('group7', {
            errors : errors,
            ID: shipmentID,
            corporativeID: corporativeID,
            bossID: ID,
            distance: distance,
            expiryDate: expiryDate,
            typefood: typefood,
            creator: req.user.email,
            status: [
              {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
            ]})
        } else { 
          Group7.findOne({ ID: shipmentID }).exec((err,product) => {
            console.log(product);
            if (product) {
              errors.push({ msg: 'Product already exists' });
              render(res,errors,ID, corporativeID, shipmentID,availability,composition,expiryDate,nutritionalInformation, pollutionGenerated, creator, company, status);
            } else {
              const newProduct = new Group7({
              ID: shipmentID,
                corporativeID: corporativeID,
                bossID: ID,
                distance: distance,
                expiryDate: expiryDate,
                typefood: typefood,
                pollutionGenerated: contamination,
                creator: req.user.email,
                status: [
                  {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
                ]
              });
  
              newProduct.save();
            }
          });
              req.flash('success_msg','You have now registered the product!')
  
              res.render('group7map',{
                user: req.user,
                ID: shipmentID,
                bossID: ID
              });
            }
      }
    });
  }
});

router.post('/group7picture', upload.single('image') ,ensureAuthenticated, async (req, res) => {
  const buffer = await sharp(
    path.join(__dirname, `../public/uploads/${req.file.filename}`),
  ).png().toBuffer();
  var ID = req.body.bossID;
  var thumb = new Buffer(buffer).toString('base64');
  await Food.findOneAndUpdate(
    { ID: ID },
    { img: thumb },
  );
  res.redirect('/index/indexlogin');

})

//Group map page, add location to product
router.post('/group7map', ensureAuthenticated, async (req, res) => {
  var lat = req.body.lat;
  var lng = req.body.lng;
  var ID = req.body.ID;
  //Errors
  let errors = [];

  console.log("DATOS: " + lat + "  " + lng + "  " + ID);

  //In case of error
  if (errors.length > 0) {
    res.render('group7map', {
      location: [lng, lat]})
  } else {
    var myquery = {ID: ID};
    //Search product 
    await Group7.findOne(myquery).exec((err ,product) => {
      //In case it exist
      if(product){
      if(lat != null && lat != ""){
        //Add location to global location (Last)
        Group7.findOneAndUpdate(myquery, {$set: {location: [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" );
        }
        console.log(doc);
        });
        //Add location to state
        Group7.findOneAndUpdate({ID: ID, "status.ID": ID}, {$set: {"status.$.currentLocation": [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });

      }
      }
    });
    req.flash('success_msg','You have now registered the product!');

 }
});


//Group 8 product = Elaborated

router.get('/registerProduct',ensureAuthenticated,(req,res)=> res.render('registerProduct'));

router.post('/registerProduct', ensureAuthenticated, async (req, res) => {
  var {ID, corporativeID, shipmentID, name, expiryDate, nutritionalInformation, company, status} = req.body;

  //Errors
  let errors = [];

  //If the user didn't write a company,he is considered a particular 
  if(req.user.company != null){
    company = req.user.company;
  }else{
    company = req.user.email;
  }

  //public ID
  ID = new ObjectID();
  //ID for the employees
  corporativeID = new ObjectID();
  //Shipment ID
  shipmentID = new ObjectID();

    //First it searchs for the food with the name and company from the input  
    if(name != '' && name != null){
      await Food.findOne({name: name, company: req.user.company}).exec((err,product) => {
      //If it doesn't exist, it's time to create it
        if(!product){
        const product = new Food({
          ID: ID,
          name: name,
          company: req.user.company,
          creator: req.user.email,
          nutritionalInformation: nutritionalInformation,
          availability: true,
          groupFood: 'Group 8',        
          pollutionGenerated: 0,
          products: [shipmentID]
        });
        product.save();
      }else{
        //If it exist, it's time to add just the ID from the new product
        Food.update({name: name, company: req.user.company}, {$push: {products: {$each: [shipmentID], $position: -1}}}, {returnOriginal: false}).exec((err ,doc) => {
          if(err){
            console.log("Something wrong when upadting data¿");
          }
        });
      }
      });
    }

  //Fields complete 
  if (!name || !expiryDate || !nutritionalInformation || !status) {
    errors.push({ msg: 'Please enter all fields' });
  }
  //Compare dates
  if (expiryDate <= datetime) {
    errors.push({ msg: 'The product is already expired' });
  }

  var contamination = 0;
  var distance = 0;

  if(name != '' && name != null){
    //It searchs for the food with the name and company from the input again and create the product in the group 1
    Food.findOne({name: name, company: req.user.company}).exec((err,product) => {
      if(product){
      //In case of error
      if (errors.length > 0) {
        res.render('registerProduct', {
          errors : errors,
          ID: shipmentID,
          corporativeID: corporativeID,
          bossID: product.ID,
          distance: distance,
          expiryDate: expiryDate,
          creator: req.user.email,
          status: [
            {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
          ]})
      } else { 
        Product.findOne({ ID: shipmentID }).exec((err,product2) => {
          console.log(product2);
          if (product2) {
            errors.push({ msg: 'Product already exists' });
            render(res,errors,ID, corporativeID, shipmentID,availability,composition,expiryDate,nutritionalInformation, pollutionGenerated, creator, company, status);
          } else {
            const newProduct = new Product({
            ID: shipmentID,
              corporativeID: corporativeID,
              bossID: product.ID,
              distance: distance,
              expiryDate: expiryDate,
              pollutionGenerated: contamination,
              creator: req.user.email,
              status: [
                {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
              ]
            });

            newProduct.save();
          }
        });
            req.flash('success_msg','You have now registered the product!')

            res.render('productmap',{
              user: req.user,
              ID: shipmentID,
              bossID: product.ID
            });
        }
      }else{
        if (errors.length > 0) {
          res.render('registerProduct', {
            errors : errors,
            ID: shipmentID,
            corporativeID: corporativeID,
            bossID: ID,
            distance: distance,
            expiryDate: expiryDate,
            creator: req.user.email,
            status: [
              {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
            ]})
        } else { 
          Product.findOne({ ID: shipmentID }).exec((err,product) => {
            console.log(product);
            if (product) {
              errors.push({ msg: 'Product already exists' });
              render(res,errors,ID, corporativeID, shipmentID,availability,composition,expiryDate,nutritionalInformation, pollutionGenerated, creator, company, status);
            } else {
              const newProduct = new Product({
              ID: shipmentID,
                corporativeID: corporativeID,
                bossID: ID,
                distance: distance,
                expiryDate: expiryDate,
                pollutionGenerated: contamination,
                creator: req.user.email,
                status: [
                  {ID: shipmentID, status: status, responsible: req.user.email, distance: distance, pollutionGenerated: contamination}
                ]
              });
  
              newProduct.save();
            }
          });
              req.flash('success_msg','You have now registered the product!')
  
              res.render('productmap',{
                user: req.user,
                ID: shipmentID,
                bossID: ID
              });
          }
      }
    });
  }
});

router.post('/productpicture', upload.single('image') ,ensureAuthenticated, async (req, res) => {
  const buffer = await sharp(
    path.join(__dirname, `../public/uploads/${req.file.filename}`),
  ).png().toBuffer();
  var ID = req.body.bossID;
  var thumb = new Buffer(buffer).toString('base64');
  await Food.findOneAndUpdate(
    { ID: ID },
    { img: thumb },
  );

})

//Group map page, add location to product
router.post('/productmap', ensureAuthenticated, async (req, res) => {
  var lat = req.body.lat;
  var lng = req.body.lng;
  var ID = req.body.ID;
  //Errors
  let errors = [];

  console.log("DATOS: " + lat + "  " + lng + "  " + ID);

  //In case of error
  if (errors.length > 0) {
    res.render('productmap', {
      location: [lng, lat]})
  } else {
    var myquery = {ID: ID};
    //Search product 
    await Product.findOne(myquery).exec((err ,product) => {
      //In case it exist
      if(product){
      if(lat != null && lat != ""){
        //Add location to global location (Last)
        Product.findOneAndUpdate(myquery, {$set: {location: [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" );
        }
        console.log(doc);
        });
        //Add location to state
        Product.findOneAndUpdate({ID: ID, "status.ID": ID}, {$set: {"status.$.currentLocation": [lng, lat]}}, {returnOriginal: false}).exec((err ,doc) => {
          if (err) {
            console.log("Something wrong when updating data!" + err);
        }
        console.log(doc);
        });

      }
      }
      
    });
    req.flash('success_msg','You have now registered the product!');
    //Time to render the page to add products in the case the actual product use another registered product in the platform
    res.render('productadd',{
      ID: ID
    });
 }
});
//Add link between products in some way
router.post('/productadd', ensureAuthenticated, async(req, res) => {
  //Data from the form post
  var {ID, busqueda} = req.body;
  //Variable where the products found with the search input are stored.
  var products = new Array();
  var i = 0;
  if(busqueda == null || busqueda == ''){
    res.redirect('/index/indexlogin');
  }
    //Search a product with a name similar to the input
    Food.find({name: new RegExp(busqueda, 'i')}).exec().then(async(product) => {
      //If it exist, the product is stored in the variable products
      await Promise.all(product.map(async (p) => {
        products[i] = p;
        i++;
      }))
      }).then(() => {
        //Time to render the page displaying the stored products
        res.render('productshow', {
         product: products,
         ID: ID
        }); 
      }) 

})


//Show product page
router.post('/productshow', ensureAuthenticated, async (req, res) => {
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
    Food.findOne({ID: usePageProduct}).exec((err, productn) => {
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
//Delete product function
router.post('/productDelete', ensureAuthenticated, async (req, res) => {
  //ID of product to delete
  var ID = req.body.deletePageProduct;
  var myquery = {ID: ID};
  //First it's time to find the group of the product
  Group1.findOne(myquery).exec((err, product) => {
    //If it exist
    if(product){
      //The product is deleted
      Group1.deleteOne(myquery, function (err) {});
    // If it doesn't exist
    }else{
      Group2.findOne(myquery).exec((err, product) => {
        //If it exist
        if(product){
          //The product is deleted
          Group2.deleteOne(myquery, function (err) {});
        // If it doesn't exist
        }else{
          Group3.findOne(myquery).exec((err, product) => {
            //If it exist
            if(product){
              //The product is deleted
              Group3.deleteOne(myquery, function (err) {});
            // If it doesn't exist
            }else{
              Group4.findOne(myquery).exec((err, product) => {
                //If it exist
                if(product){
                  //The product is deleted
                  Group4.deleteOne(myquery, function (err) {});
                // If it doesn't exist
                }else{
                  Group5.findOne(myquery).exec((err, product) => {
                    //If it exist
                    if(product){
                      //The product is deleted
                      Group5.deleteOne(myquery, function (err) {});
                    // If it doesn't exist
                    }else{
                      Group6.findOne(myquery).exec((err, product) => {
                        //If it exist
                        if(product){
                          //The product is deleted
                          Group6.deleteOne(myquery, function (err) {});
                        // If it doesn't exist
                        }else{
                          Group7.findOne(myquery).exec((err, product) => {
                            //If it exist
                            if(product){
                              //The product is deleted
                              Group7.deleteOne(myquery, function (err) {});
                            // If it doesn't exist
                            }else{
                              Product.findOne(myquery).exec((err, product) => {
                                //If it exist
                                if(product){
                                  //The product is deleted
                                  Product.deleteOne(myquery, function (err) {});
                                
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
  res.redirect('/users/profile');
})

router.get('/globalProductEdit',ensureAuthenticated, async(req,res)=>{
  var products = new Array();
  var i = 0;
  Food.find({ creator: req.user.email }).exec().then((product) => {
      product.forEach(function (p) {
        products[i] = p;
        i++;
      });
  }).then(() => {
    Food.find({permissions: req.user.email}).exec().then((product) => {
      if(product){
        product.forEach(function(p) {
          products[i] = p;
          i++;
        });
      }
    }).then(() => {
      res.render('globalProductEdit', {
        products: products
      });
    });
  });
});

router.post('/globalProductEdit', ensureAuthenticated, async(req,res)=>{
  var {ID, name, availability, nutritionalInformation, permissions} = req.body;

  //Add permissions
  if(permissions!= null && permissions != ""){
    await Food.update({ID: ID}, {$push: {permissions: {$each: [permissions], $position: -1}}}, {returnOriginal: false}).exec((err ,doc) => {
      if (err) {
          console.log("Something wrong when updating data!");
      }
    
      console.log(doc);
    });
  }
  
  //Change avaliability product
  await Food.findOneAndUpdate({ID: ID}, {$set: {availability: Boolean(availability)}}, {returnOriginal: false}).exec((err ,doc) => {
    if (err) {
      console.log("Something wrong when updating data!");
    }
    console.log(doc);
  });
  
  //Change name
  if(name != null && name != ""){
    await Food.findOneAndUpdate({ID: ID}, {$set: {name: name}}, {returnOriginal: false}).exec((err ,doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }
      console.log(doc);
    });
  }
  
  //Change Nutritional Information
  if(nutritionalInformation != null && nutritionalInformation != ""){
    await Food.findOneAndUpdate({ID: ID}, {$set: {nutritionalInformation: nutritionalInformation}}, {returnOriginal: false}).exec((err ,doc) => {
      if (err) {
        console.log("Something went wrong!");
      }
      console.log(doc);
    });
  }
});

//Delete product function
router.post('/productDeleteGlobal', ensureAuthenticated, async (req, res) => {
  //ID of product to delete
  var ID = req.body.deletePageProduct;
  var myquery = {ID: ID};

  await Food.findOne(myquery).exec((err, product) => {
    if(product){
      Food.deleteOne(myquery, function(err) {});
    }
  })
  res.redirect('/products/globalProductEdit');
})



module.exports = router;