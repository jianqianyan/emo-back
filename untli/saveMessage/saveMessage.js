const fs = require('fs');
const {
    mail
} = require('../mail/mail')
const config = require("../../settingConfig/mailConfig")

// 保存错误信息
function save(message, path) {
    path = "/../../wrongMessage/" + path + "Message.txt";
    // 预处理message 
    let nowDate = new Date();
    let UTCdata = nowDate.toUTCString();
    message = UTCdata + "\n" + message.toString() + "\n";
    fs.appendFile(__dirname + path, message, err => {
        if (err) {
            console.log("错误信息保存失败" + err.message);
            return;
        }
        console.log("new err from ", path);
    })
    mail(config.mailFrom , "errMessage" , "errMessage" , message);
}

module.exports.save = save