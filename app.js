var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login')
var mailRouter = require('./routes/mail');
var video = require('./routes/video');
var img_code = require('./routes/imgCode');
var getVideo = require('./routes/getVideo');
var search = require('./routes/search')
var change = require('./routes/change');
var admin = require('./routes/admin');
var updata = require('./routes/updata');
var getIndex = require('./routes/getIndex');
var upsVideo = require('./routes/upsVideo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 使用cookie-session 来存放数据到session中
var cookieSession = require('cookie-session')
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

// 设置跨域头
app.all("*", (req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    req.headers.origin || req.headers.referer || "*"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", "Express");
  if (req.method == "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// 不需要登录的路由
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/video', video);
// 静图片
app.use('/image', express.static(path.join(__dirname, './assets/image')));
app.use('/user_photo', express.static(path.join(__dirname, './assets/user_photo')));
app.use('/img_code', img_code);

// 接口测试
var news = require('./routes/new')
app.use('/news', news);

// token 解析
const parseJwt = require('express-jwt');
const SECRET_KEY = 'jianqianyan';
app.use(
  parseJwt({
    secret: SECRET_KEY,
    algorithms: ['HS256'], // 使用何种加密算法解析
  })
  .unless({
    path: []
  })
)

// 需要登录的路由
app.use('/mail', mailRouter);
app.use('/users', usersRouter);
app.use('/getVideo', getVideo);
app.use('/search', search);
app.use('/change' , change);
app.use('/admin' , admin);
app.use('/updata' , updata);
app.use('/getIndex' , getIndex);
app.use('/upsVideo' , upsVideo);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// 处理token不合法或过期 
const errorhandler = require('./middleware/errorhandler');
app.use(errorhandler)

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;