var express = require('express');
var router = express.Router();
var db = require('../untli/db/db')
var setToken = require('../untli/token/token')

// 登录验证
// 登录成功返回用户id,账号不存在返回-1,密码错误返回-2,登录失败返回-3
router.get('/' , async function (req , res , next) {
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
  let token;
  if(user.length == 0){
    retunmes.data = -1;
  }
  else{
    if(String(user[0].password) == String(password)){
      // 登录成功
      retunmes.data = 1;
      retunmes.userid = user[0].id;

      // 设置cookie
      // res.cookie('user_id', retunmes.userid, {maxAge: 600000});

      // 设置token
      token = setToken(retunmes);

    }
    else{
      retunmes.data = -2;
    }
  }
  res.send({status: 200,message:retunmes,token});
})

module.exports = router;
