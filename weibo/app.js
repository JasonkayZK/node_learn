var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');
// var layouts = require('express-ejs-layouts');
// var createError = require('http-errors');

// 鼠标指针
// var favicon = require('serve-favicon');

var session = require('express-session');
var MongoStore = require('connect-mongo/es5')(session);
var setting = require('./setting');

// 主页
var routes = require('./routes/index');

var app = express();

app.set('env', 'production');
var accessLogFile = fs.createWriteStream('access.log', {flag: 'a'});
var errorLogFile = fs.createWriteStream('error.log', {flag: 'a'});
app.use(logger('combined' , {stream: accessLogFile}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 加载中间件

// 修改鼠标指针;
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(layouts);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// save session
app.use(session({
  secret: setting.cookieSecret,
  key: setting.db,//cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  store: new MongoStore({
    url: 'mongodb://localhost:27017',
    db: setting.db
  })
}));


/* 配置路由 */
// 主页路由
app.use('/', routes);






// list路由
// app.get('/list', (req, res) => {
//   res.render('list', {
//     title: 'List',
//     layout: 'layout',
//     items: [1996, 'Jasonkay', 'express', 'Node.js']
//   });
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktrace leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  var meta = '[' + new Date() + ']' + req.url + '\n';
  errorLogFile.write(meta + err.stack + '\n');
  res.render('error', {
    message: err.message,
    error: {}
  });
});

if (!module.parent) {
  app.listen(3000);
  console.log('Express server listening on port %d in %s mode',
    3000, app.get('env'));
}

module.exports = app;
