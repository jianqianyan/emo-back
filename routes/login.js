var express = require('express');
var router = express.Router();
var db = require('../untli/db/db')
var setToken = require('../untli/token/token')
var untli = require('../untli/untli')
const returnMessage = require("../model/returnMessage")
const save = require("../untli/saveMessage/saveMessage")
const {
  checkIsNull
} = require("../untli/untli")

// user login
router.post('/', async function (req, res, next) {
  let login_message = req.body;
  let user = [];
  var return_mes = new returnMessage();
  // password phone img_node can not be null
  if (untli.checkIsNull(login_message.phone) || untli.checkIsNull(login_message.password) || untli.checkIsNull(login_message.img_code)) {
    return_mes.state = -1;
    return_mes.data.cause = "用户号码,密码，验证码不能为空";
    res.send(return_mes);
    return;
  }
  // check img_code
  if (login_message.img_code != req.session.img_code) {
    return_mes.state = -1;
    return_mes.data.cause = "验证码错误";
  } else {
    // try to find user
    try {
      // Select target table
      let outside = "users";
      if (login_message.type == 2) {
        outside = "admin";
      }
      user = await db.find(outside, {
        "phone": login_message.phone
      });
    } catch (err) {
      save.save(err.message, "login");
      return_mes.state = -3;
    }
    if (return_mes.state != -3 && user.length == 0) {
      // no find
      return_mes.state = -1;
      return_mes.data.cause = "用户不存在";
    } else {
      // check password
      if (String(user[0].password) == String(login_message.password)) {
        return_mes.state = 200;
        return_mes.data.message.id = user[0].id;
        return_mes.data.message.name = user[0].name;
        return_mes.data.message.name = user[0].path;
        if (checkIsNull(user[0].img_path)) {
          return_mes.data.message.img_path = "http://81.68.212.237:3000/user_photo/" + user[0].img_path;
        }
        else{
          return_mes.data.message.img_path = "http://81.68.212.237:3000/user_photo/1.jpg";
        }
        // token
        let token = setToken(return_mes.data);
        return_mes.data.token = token;
      } else {
        return_mes.state = -1;
        return_mes.data.cause = "密码错误";
      }
    }
  }
  res.send(return_mes);
})


// 注册
router.post('/register', async function (req, res, next) {
  let regis_message = req.body;
  var return_mes = new returnMessage();
  let user = [];
  // 不能为空
  if (untli.checkIsNull(regis_message.phone) || untli.checkIsNull(regis_message.password) || untli.checkIsNull(regis_message.img_code)) {
    return_mes.state = -1;
    return_mes.data.cause = "用户号码,密码，验证码不能为空";
    res.send(return_mes);
    return;
  }
  // 验证验证码是否正确
  if (regis_message.img_code != req.session.img_code) {
    return_mes.state = -1;
    return_mes.data.cause = "验证码错误";
  } else {
    try {
      user = await db.find("users", {
        "phone": regis_message.phone,
      })
    } catch (err) {
      return_mes.state = -3;
      save.save(err.message, "register");
    }
    // 判断号码是否被注册
    if (return_mes.state != -3 && user.length == 0) {
      // 拼接信息
      let sql_message = {
        phone: regis_message.phone,
        password: regis_message.password,
        email: regis_message.email,
        sex: "N",
        information: "简介",
        name: regis_message.phone,
        registe_time: untli.getsqlDate()
      }
      let sql_res;
      try {
        sql_res = await db.add("users", sql_message);
      } catch (err) {
        save.save(err.message);
        return_mes.state = -3;
      }
      if (sql_res == "-1") {
        return_mes.state = -3;
      } else {
        return_mes.state = 200;
        return_mes.data.message.info = "注册成功";
      }
    } else {
      return_mes.state = -1;
      return_mes.data.cause = "该号码已被注册";
    }
  }
  res.send(return_mes);
})

// admin login
router.post('/admin', async function (req, res, next) {

})

module.exports = router;