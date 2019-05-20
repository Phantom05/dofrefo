# Front-end Server

+ Server : Node.js
+ Framework : Express



**File Structure**

```
bin
│  ├─www
doc
lib
locals
node_modules
public
│  ├─dist
│  │  └─assets
│  │      ├─css
│  │      │  ├─common
│  │      │  └─pages
│  │      │      └─users
│  │      ├─img
│  │      │  ├─pages
│  │      │  │  └─main
│  │      │  └─sprite
│  │      └─js
│  │          ├─common
│  │          └─pages
│  │              └─users
│  └─src
│      └─assets
│          ├─img
│          │  ├─img-sprites
│          │  │  └─icon
│          │  └─pages
│          │      └─main
│          ├─js
│          │  ├─common
│          │  └─pages
│          │      ├─about
│          │      └─users
│          └─scss
│              ├─common
│              ├─pages
│              │  ├─about
│              │  └─users
│              └─vendors
├─routes
└─views
    ├─Common
    └─Pages
        ├─About
        └─Users

```



### www

```js
#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('test1:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '8000'); 
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port,()=>{
  console.log(`${port} server running!`)
});
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

```



### app.js

```js
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
var passport = require('passport');
var cron = require('node-cron');
var axios = require('axios');

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
  saveUninitialized: false
 }));

 app.use(function(req,res,next){
  res.locals.dummy = require('./dummy.json');
  res.locals.sess = req.session;
  next()
 })


  let connection = null;
  if (env.server == 'localhost') {
    console.log('DATABASE localhost')
    connection = mysql.createConnection({
      host: env.LOCAL_DB_HOST,
      port: env.LOCAL_DB_PORT,
      user: env.LOCAL_DB_USER,
      password: env.LOCAL_DB_PASSWORD,
      database: env.LOCAL_DB_NAME
    })
    connection.connect();
   
  } else if (env.server == 'server') {
    console.log('DATABASE server')
    connection = mysql.createConnection({
      host: env.AWS_DB_HOST,
      port: env.AWS_DB_PORT,
      user: env.AWS_DB_USER,
      password: env.AWS_DB_PASSWORD,
      database: env.AWS_DB_DATABASE,
    })
    connection.connect();
  }
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));
app.use(`/img`,express.static(path.join(__dirname, 'public/dist/assets/img/pages')));
app.use(`/sprite`,express.static(path.join(__dirname, 'public/dist/assets/img/sprite')));


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

```



