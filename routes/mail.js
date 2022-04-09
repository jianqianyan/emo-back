var express = require('express');
var router = express.Router();
var mail = require('../untli/mail/mail')

router.get('/' , async(req , res) => {
    userMail = [""];
    mail.mail(userMail , "1433223");
    res.send("验证码发送成功！");
})

module.exports = router;