var express = require('express');
var path = require('path');
var mongoose =require('mongoose');
mongoose.connect('mongodb://127.0.0.1/feibao');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session =require('express-session');
var MongoStore =require('connect-mongo')(session);
var bodyParser = require('body-parser');

var admins = require('./routes/admins');
var users = require('./routes/users');
var waste_sorts = require('./routes/waste_sorts');
var wares = require('./routes/wares');
var articles = require('./routes/articles');
var bespeak_recycles = require('./routes/bespeak_recycles');
var cycle_recycles = require('./routes/cycle_recycles');
var orders = require('./routes/orders');
var cycle_distributions = require('./routes/cycle_distributions');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set( 'view engine', 'html' );
//app.set('view engine', 'ejs');
//
//// uncomment after placing your favicon in /public
////app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
//解析jSON请求
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret:"feibao",//加密摘要
    resave:true,
    saveUninitialized:true,
    cookies:{
        maxAge:1000*60*30
    },
    store:new MongoStore({
        url:'mongodb://127.0.0.1/feibao'
    })
}));

app.use('/admins', admins);
app.use('/users', users);
app.use('/waste_sorts', waste_sorts);
app.use('/wares', wares);
app.use('/articles', articles);
app.use('/bespeak_recycles', bespeak_recycles);
app.use('/cycle_recycles', cycle_recycles);
app.use('/orders', orders);
app.use('/cycle_distributions', cycle_distributions);

app.listen(3000);
//
//// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  next(err);
//});
//
//// error handlers
//
//// development error handler
//// will print stacktrace
//if (app.get('env') === 'development') {
//  app.use(function(err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//      message: err.message,
//      error: err
//    });
//  });
//}
//
//// production error handler
//// no stacktraces leaked to user
//app.use(function(err, req, res, next) {
//  res.status(err.status || 500);
//  res.render('error', {
//    message: err.message,
//    error: {}
//  });
//});


//module.exports = app;
