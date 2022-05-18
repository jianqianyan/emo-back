var express = require('express');
var router = express.Router();
var db = require('../untli/db/db')
const returnMessage = require("../model/returnMessage")
const untli = require("../untli/untli");
const { save } = require('../untli/saveMessage/saveMessage');
/* GET users listing. */

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// update ueser's message
router.post('/changeMessage', async function (req, res, next) {
  // get user's message
  let userMessage = req.body;
  let return_mes = new returnMessage();
  // Processing data
  if(userMessage.sex == '男'){
    userMessage.sex = 'N';
  }
  else{
    userMessage.sex = 'W';
  }
  if(userMessage.registe_time){
    delete userMessage.registe_time;
  }
  let user = {};
  user.id = userMessage.id;
  delete userMessage.id;
  // try update
  try{
    await db.update("users" , user , userMessage);
    return_mes.state = 200;
    return_mes.data.message = "修改成功";
  }catch(err){
    save.save(err, "users");
    return_mes.state = -1;
    return_mes.data.message = "修改失败";
  }
  res.send(return_mes);
})

// 删除用户信息
router.post('/delect', async function (req, res, next) {
  res.send("");
})

// 根据user_id查询用户基本信息
// 只需知道用户的部分基本信息，名字，头像地址，id，简介
router.get('/getMessage', async function (req, res, next) {
  let user_id = req.query.user_id;
  var return_mes = new returnMessage();
  let user = [];
  if (untli.checkIsNull(user_id)) {
    return_mes.state = -1;
    return_mes.data.cause = "用户id不能为空";
    res.send(return_mes);
    return;
  }
  // 尝试查找用户信息
  try {
    user = await db.find("users", {
      id: user_id,
    })
  } catch (err) {
    save.save(err.message, "users");
    return_mes.state = -3;
  }
  if (user.length > 0) {
    // 如果存在用户 封装返回信息
    return_mes.state = 200;
    return_mes.data.message = {
      name: user[0].name,
      img_path: user[0].img_path,
      id: user[0].id,
      information: user[0].information
    };
  } else {
    return_mes.state = -1;
    return_mes.data.cause = "用户不存在";
  }
  res.send(return_mes);
})

module.exports = router;