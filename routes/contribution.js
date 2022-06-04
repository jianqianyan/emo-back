var express = require('express');
var router = express.Router();
const db = require("../untli/db/db");
const save = require("../untli/saveMessage/saveMessage")
const returnMessage = require("../model/returnMessage")
var untli = require('../untli/untli');
const {
    checkIsNull,
    getsqlDate
} = require('../untli/untli')

router.post('/', async function (req, res, next) {
    let return_mes = new returnMessage();
    let message = req.body;
    let messageList = ["path", "cover", "name", "type", "tag", "up_id", "up_name", "information"];
    if(message.length > messageList.length){
        return_mes.state = -1;
        return_mes.data.cause = "不需要多余信息";
    }
    for (let i = 0; i < messageList.length; ++i) {
        if (checkIsNull(message[messageList[i]])) {
            return_mes.state -1;
            return_mes.data.cause = messageList[i] + "不能为空";
            res.send(return_mes);
            return ;
        }
    }
    message.upload_time = getsqlDate();
    try{
        let table = "videos";
        let data =  await db.add(table , message);
    }catch(err){
        save.save(err);
    }
    return_mes.state = 200;
    return_mes.data.message = "OK"
    res.send(return_mes);
})

module.exports = router;