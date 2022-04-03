var express = require('express');
var router = express.Router();
var db = require('../db/db')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 登录验证
// 登录成功返回用户id,账号不存在返回-1,密码错误返回-2,登录失败返回-3
router.get('/login' , async function (req , res , next) {
  let message = req.query;
  let phone = message.phone;
  let password = message.password;
  let user = {};
  let retunmes = {};
  // 尝试查找是否有users
  try{
    user = await db.login("users" , phone);
  }
  catch(err){
    console.log(err.message);
    retunmes.data = -3;
  }
  // 存在用户
  if(user.length == 0){
    retunmes.data = -1;
  }
  else{
    if(String(user[0].password) == String(password)){
      retunmes.data = 1;
      retunmes.userid = user[0].id;
    }
    else{
      retunmes.data = -2;
    }
  }
  res.send(JSON.stringify(retunmes));
})

module.exports = router;
