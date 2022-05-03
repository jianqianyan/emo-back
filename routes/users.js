var express = require('express');
const { user } = require('../settingConfig/sqlConfig');
var router = express.Router();
var db = require('../untli/db/db')
var setToken = require('../untli/token/token')
/* GET users listing. */

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
  console.log(req.user);
});

// 修改用户信息
router.post('/changeMessage', async function (req, res, next) {
  // 获取登录信息
  let userMessage = req.user;
  let user = {};
  user.id = userMessage.userid;
  // 获取需要更改的信息
  let changeMessage = req.body;
  let return_mes = {};
  try {
    await db.update("users", user, changeMessage);
    return_mes.message = "更改成功";
  } catch (err) {
    console.log(err);
    return_mes.message = "更改失败";
  }
  res.send(return_mes);
})

// 删除用户信息
router.post('/delect', async function (req, res, next) {
  res.send("");
})

// 根据user_id查询用户基本信息
// 只需知道用户的部分基本信息，名字，头像地址，id，简介
router.get('/getmesage', async function(req , res , next){
  let user_id = req.query.id;
  let return_mes = {};
  let user = {};
  try{
    user = await db.find("users" , {
      "id": user_id,
    })
  }
  catch(err){
    console.log(err);
    return_mes.state = -3;
  }
  // 存在用户
  if(user.length > 0){ 
    return_mes.state = 200;
    return_mes.data = {
      name: user[0].name,
      img_path: user[0].img_path,
      id: user[0].id,
      information: user[0].information
    };
    
  }
  else{
    return_mes.state = -2;
  }
  res.send(return_mes);
})

module.exports = router;