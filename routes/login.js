var express = require('express');
var router = express.Router();
var db = require('../untli/db/db')
var setToken = require('../untli/token/token')
const svgCaptcha = require("svg-captcha")

// 验证码
router.get('/img_code', async (req, res) => {
  const captcha = svgCaptcha.create({
    noise: 3,
  });
  req.session.img_code = captcha.text;
  res.type('svg');
  res.send(captcha.data);
});

// 登录验证
// 登录成功返回用户id,账号不存在返回-1,密码错误返回-2,登录失败返回-3,验证码错误返回-4
router.get('/', async function (req, res, next) {
  let message = req.query;
  let phone = message.phone,
    password = message.password,
    img_code = message.img_code;
  let user = {},
    retunmes = {};
  retunmes.statue = 200;
  console.log(img_code);
  if (img_code != req.session.img_code) {
    // 验证验证码是否正确
    retunmes.data = -4;
  } else {
    // 尝试查找是否有users
    try {
      user = await db.find("users", {
        "phone": phone
      });
    } catch (err) {
      console.log(err.message);
      retunmes.data = -3;
    }
    // 存在用户
    let token;
    if (user.length == 0) {
      retunmes.data = -1;
    } else {
      if (String(user[0].password) == String(password)) {
        // 登录成功
        retunmes.data = 1;
        retunmes.userid = user[0].id;

        // 设置token
        token = setToken(retunmes);
        retunmes.token = token;
      } else {
        retunmes.data = -2;
      }
    }
  }

  res.send(retunmes);
})

// 注册
router.post('/register', async function (req, res, next) {
  let message = req.body;
  let retunmes = {};
  let data = await db.find("users", {
    "phone": message.phone
  });
  if (data.length == 0) {
    let data = await db.add("users", message);

    if (data == "-1") {
      retunmes.message = "注册失败";
    } else {
      retunmes.message = "注册成功";
    }
  } else {
    retunmes.message = "该电话号码已被注册";
  }

  retunmes.status = 200;
  res.send(retunmes);
})

module.exports = router;