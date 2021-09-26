var createError = require('http-errors');

//Express
var express = require('express');
var app = express();

var path = require('path');
var mongoose = require('mongoose');

//Passport
var passport = require('passport');
var flash = require('connect-flash');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var dotenv = require('dotenv');
var logger = require('morgan');

var Emitter = require('events');

//For the profile image
//var multer = require('multer');
//var fs = require('fs');

//Database connection
var conn = mongoose.createConnection('mongodb://localhost:27017/trfood', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});



/*
//Connection to users database
var connU = mongoose.createConnection('mongodb+srv://<user>:<passwoord>@cluster0.asvuk.mongodb.net/Users?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

//Connection to food products database (Every delivery)
var connP = mongoose.createConnection('mongodb+srv://<user>:<passwoord>@cluster0.asvuk.mongodb.net/Products?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

//Coonnection to food database (A global existing food)
var connC = mongoose.createConnection('mongodb+srv://<user>:<passwoord>@cluster0.asvuk.mongodb.net/Food?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
*/
var connC, connU, connP ;

connC = connU = connP = conn;


//Collection Food Existing
var Food = connC.model('Food', require('./model/globalProduct'));
exports.Food = Food;
//Collection users
var User = connU.model('User', require('./model/user'));
exports.User = User;

//Collection food elaborated product delivery
var Product = connP.model('Product', require('./model/product'));
exports.Product = Product;
//Collection food groups delivery
var Group1 = connP.model('Group1', require('./model/group1'));
var Group2 = connP.model('Group2', require('./model/group2'));
var Group3 = connP.model('Group3', require('./model/group3'));
var Group4 = connP.model('Group4', require('./model/group4'));
var Group5 = connP.model('Group5', require('./model/group5'));
var Group6 = connP.model('Group6', require('./model/group6'));
var Group7 = connP.model('Group7', require('./model/group7'));
exports.Group1 = Group1;
exports.Group2 = Group2;
exports.Group3 = Group3;
exports.Group4 = Group4;
exports.Group5 = Group5;
exports.Group6 = Group6;
exports.Group7 = Group7;

//Express session
var expressSession = require('express-session')({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
});

//Socket
var io = require('socket.io');
var server = require('http').Server(app);
io = io(server);

//Event emitter
var eventEmitter = new Emitter();
app.set('eventEmitter', eventEmitter);

app.set('views', [__dirname + '/views', __dirname + '/viewslogin']);
app.set('view engine', 'ejs');

app.use(logger());
app.use(bodyParser.json({limit: '16mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '16mb' ,extended: true }));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressSession);
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


require('./config/passport')(passport);

//Routes
app.use('/index',  require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/about', require('./routes/about'));
app.use('/contact', require('./routes/contact'));
app.use('/identifier', require('./routes/identifier'));
app.use('/forgotPass', require('./routes/forgotPass'));
app.use('/terms&privacy', require('./routes/terms&privacy'));
app.use('/indexInfo', require('./routes/indexInfo'));
app.use('/authentification', require('./routes/authentification'));
app.use('/products', require('./routes/products'));
app.use('/dashboard', require('./routes/dashboard'));

app.use((req,res,next)=> {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error  = req.flash('error');
next();
})

dotenv.config();

app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = {
  app
}
