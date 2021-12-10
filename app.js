var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const usersRouter = require('./routes/users');
const indexRouter = require('./routes/index');
const pruebaRouter = require('./routes/prueba');
const changeLocaleRouter = require('./routes/change-local');

const jwtAuth = require('./lib/jwtAuthMiddleWare');

const LoginController = require('./controllers/loginController');

const utils = require('./helpers/utils');

var app = express();

//Mongoose DB
require('./lib/connectMongoose.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize the controllers
const loginController = new LoginController();

// Api routes
app.use('/api/posts', jwtAuth, require('./routes/api/posts.js'));
app.post('/api/login', loginController.postJWT);

// Setup de i18n
const i18n = require('./lib/i18nConfigure');
const { body } = require('express-validator');
app.use(i18n.init);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/change-locale', changeLocaleRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  if (utils.isAPIRequest(req)) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

module.exports = app;
