var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var helloRouter = require('./routes/hello');
var loginRouter = require('./routes/login')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 不需要登录的路由
app.use('/', indexRouter);
app.use('/login' , loginRouter);

// token 解析
const parseJwt = require('express-jwt');
const SECRET_KEY = 'jianqianyan';
app.use(
  parseJwt({
      secret: SECRET_KEY,
      algorithms: ['HS256'], // 使用何种加密算法解析
  })
    .unless({ path: [] })
)

// 需要登录的路由
app.use('/users', usersRouter);
app.use('/hello' , helloRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// 处理token不合法或过期 
const errorhandler = require('./middleware/errorhandler')
app.use(errorhandler)

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
