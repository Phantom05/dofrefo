console.log(process.env.NODE_ENV) 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var kill = require('kill-port');
var bodyParser = require('body-parser');
var httpsRedirect = require('express-https-redirect');
// var i18n = require('./i18n');
var url = require('url');
var mysql = require('mysql');
var env = require('./config'); 
var passport = require('passport');
var cron = require('node-cron');
var axios = require('axios');
var helmet = require('helmet');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('case sensitive routing', true);

app.use(session({
  secret: '@#@$DOF#@$#$',
  resave: false,
  saveUninitialized: false,
  cookie:{
    secure:true,
    httpOnly:true,
  }
 }));

 app.use(helmet())

 app.use(function(req,res,next){
  res.locals.dummy = require('./dummy.json');
  res.locals.sess = req.session;
  next()
 })


// Database Connect
//  let connection = null;
//  if (env.server == 'localhost') {
//    console.log('DATABASE localhost')
//    connection = mysql.createConnection({
//      host: env.LOCAL_DB_HOST,
//      port: env.LOCAL_DB_PORT,
//      user: env.LOCAL_DB_USER,
//      password: env.LOCAL_DB_PASSWORD,
//      database: env.LOCAL_DB_NAME
//    })
//    connection.connect();
   
//  } else if (env.server == 'server') {
//    console.log('DATABASE server')
//    connection = mysql.createConnection({
//      host: env.AWS_DB_HOST,
//      port: env.AWS_DB_PORT,
//      user: env.AWS_DB_USER,
//      password: env.AWS_DB_PASSWORD,
//      database: env.AWS_DB_DATABASE,
//    })
//    connection.connect();
//  }

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));
app.use(`/img`,express.static(path.join(__dirname, 'public/dist/assets/img/pages')));
app.use(`/sprite`,express.static(path.join(__dirname, 'public/dist/assets/img/sprite')));
// app.use(`/views`,express.static(path.join(__dirname, 'views')));

// Router import
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
