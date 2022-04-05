var express = require('express');
var router = express.Router();
var db = require('../untli/db/db')
var setToken = require('../untli/token/token')
/* GET users listing. */

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  console.log(req.user);
});

// 修改用户信息
router.post('/changeMessage' , async function(req , res , next) {
  // 获取登录信息
  let userMessage = req.user;
  let user = {};
  user.id = userMessage.userid;
  // 获取需要更改的信息
  let changeMessage = req.body;
  let returnmes = {};
  try{
    await db.update("users" , user , changeMessage);
    returnmes.message = "更改成功";
  }
  catch(err){
    console.log(err);
    returnmes.message = "更改失败";
  }
  res.send(returnmes);
})

// 删除用户信息
  router.post('/delect' , async function(req , res , next){
    res.send("");
  })

module.exports = router;
