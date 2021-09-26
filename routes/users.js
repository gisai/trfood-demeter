var express = require('express');
var router = express.Router();
const {ensureAuthenticated} = require("../config/auth.js")

//collections
var app = require('../app');
const { accessSync } = require('fs');
var Product = app.Product;
var user = app.User;
//Food groups
var group1 = app.Group1;
var group2 = app.Group2;
var group3 = app.Group3;
var group4 = app.Group4;
var group5 = app.Group5;
var group6 = app.Group6;
var group7 = app.Group7;
var food = app.Food;



router.get('/profile',ensureAuthenticated, async(req,res)=>{
  var edits = new Array();
  var edits2 = new Array();
  var i = 0;
  Product.find({creator: req.user.email}).exec().then(async (edit) => {
      await Promise.all(edit.map(async (p) => {
        await food.findOne({ID: p.bossID}).exec().then((product) => {
          edits2[i] = product;
          edits[i] = p;
          i++;
        })
      }))
    }).then(() => {
      group1.find({creator: req.user.email}).exec().then(async(edit) => {
        await Promise.all(edit.map(async (p) => {
          await food.findOne({ID: p.bossID}).exec().then((product) => {
            edits2[i] = product;
            edits[i] = p;
            i++;
          })
        }))
      }).then(() => {
        group2.find({creator: req.user.email}).exec().then(async(edit) => {
          await Promise.all(edit.map(async (p) => {
            await food.findOne({ID: p.bossID}).exec().then((product) => {
              edits2[i] = product;
              edits[i] = p;
              i++;
            })
          }))
      }).then(() => {
        group3.find({creator: req.user.email}).exec().then(async(edit) => {
          await Promise.all(edit.map(async (p) => {
            await food.findOne({ID: p.bossID}).exec().then((product) => {
              edits2[i] = product;
              edits[i] = p;
              i++;
            })
          }))
      }).then(() => {
        group4.find({creator: req.user.email}).exec().then(async(edit) => {
          await Promise.all(edit.map(async (p) => {
            await food.findOne({ID: p.bossID}).exec().then((product) => {
              edits2[i] = product;
              edits[i] = p;
              i++;
            })
          }))
      }).then(() => {
        group5.find({creator: req.user.email}).exec().then(async(edit) => {
          await Promise.all(edit.map(async (p) => {
            await food.findOne({ID: p.bossID}).exec().then((product) => {
              edits2[i] = product;
              edits[i] = p;
              i++;
            })
          }))
      }).then(() => {
        group6.find({creator: req.user.email}).exec().then(async(edit) => {
          await Promise.all(edit.map(async (p) => {
            await food.findOne({ID: p.bossID}).exec().then((product) => {
              edits2[i] = product;
              edits[i] = p;
              i++;
            })
          }))
      }).then(() => {
        group7.find({creator: req.user.email}).exec().then( async(edit) => {
          await Promise.all(edit.map(async (p) => {
            await food.findOne({ID: p.bossID}).exec().then((product) => {
              edits2[i] = product;
              edits[i] = p;
              i++;
            })
          }))
      }).then(async() => {
        res.render('profile',{
          user: req.user,
          edits: edits,
          edits2: edits2
        });
      })
    })
    })
    })
    })
    })
    })
  })
})


function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 

router.get('/myaccount',ensureAuthenticated,(req,res)=>{
  res.render('myaccount',{
    user: req.user
  });
})

router.post('/myaccount',ensureAuthenticated, async (req,res)=>{
  var {name, surname, email, password, password2 , professions} = req.body;
  let errors = [];
  var myquery = {email: req.user.email};

  if(name != null && name != ''){
    await user.findOneAndUpdate(myquery, {$set: {name: name}}, {returnOriginal:false}, (err, doc) => {
      if(err){
        console.log("Something wrong¡!");
      }
      console.log(doc);
    });
  }

  if(surname != null && surname != ''){
    await user.findOneAndUpdate(myquery, {$set: {surname: surname}}, {returnOriginal:false}, (err, doc) => {
      if(err){
        console.log("Something wrong¡!");
      }
      console.log(doc);
    });
  }

  if(password != null && password != '' && password2 != null && password2 != ''){
    if(password == password2){
      await user.findOneAndUpdate(myquery, {$set: {password: password}}, {returnOriginal:false}, (err, doc) => {
        if(err){
          console.log("Something wrong¡!");
        }
        console.log(doc);
      });
    }
  }

  if(professions != null && professions != ''){
    if(professions != req.user.professions){
      await user.findOneAndUpdate(myquery, {$set: {professions: professions}}, {returnOriginal:false}, (err, doc) => {
        if(err){
          console.log("Something wrong¡!");
        }
        console.log(doc);
      });
    }
  }

  if(email != null && email != ''){
    await user.findOneAndUpdate(myquery, {$set: {email: email}}, {returnOriginal:false}, (err, doc) => {
      if(err){
        console.log("Something wrong¡!");
      }
      console.log(doc);
    });
  }

  res.redirect('/users/profile');

})

module.exports = router;
