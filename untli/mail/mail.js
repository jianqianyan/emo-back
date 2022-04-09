"use strict";
const nodemailer = require("nodemailer");
var config = require("../../settingConfig/mailConfig");

async function mail(userMail , img_code) {
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
        from: `欸嘿 <` + config.mailFrom + `>`, // sender address
        to: userMail, // list of receivers
        subject: "[验证码]", // Subject line
        text: "[验证码]" , // plain text body
        html: "【验证码】" + img_code, // html body
      })
    }
    catch(err){
      console.log(err);
    }
}

module.exports.mail = mail