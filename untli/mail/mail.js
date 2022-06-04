"use strict";
const nodemailer = require("nodemailer");
var config = require("../../settingConfig/mailConfig");

// 邮件验证方法
async function mail(userMail, subject = "[验证码]" , text = "[验证码]" , html = "【验证码】") {
    try{
      let transporter = nodemailer.createTransport({
        host: config.smtp,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: config.mailFrom, // generated ethereal user
          pass: config.mailPwd, // generated ethereal password
        },
      });
      let info = await transporter.sendMail({
        from: `<` + config.mailFrom + `>`, // sender address
        to: userMail, // list of receivers
        subject: subject, // Subject line
        text: text , // plain text body
        html: html, // html body
      })
    }
    catch(err){
      console.log(err);
    }
}

module.exports.mail = mail