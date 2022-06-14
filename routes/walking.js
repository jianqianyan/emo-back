var express = require('express');
var router = express.Router();
const db = require("../untli/db/db");
const save = require("../untli/saveMessage/saveMessage")
const returnMessage = require("../model/returnMessage")
const {
    checkIsNull
} = require("../untli/untli");
const { user } = require('../settingConfig/sqlConfig');

router.get('/' , async function(req , res , next) {
    let return_mes = new returnMessage();
    let table = "walkings";
    let condition = {is_recommend: "1"};
    let data = [];
    try{
        data = db.find(table , condition);
    }
    catch(err){
        return_mes.state = -3;
        save.save(err.message);
    }
    if(data.length > 0){
        return_mes.message = data;
        return_mes.state = 200;
    }
    else{
        return_mes.cause = "查询失败";
        return_mes.state = -1;
    }
    res.send(return_mes);
})

router.post('/add', async function (req, res, next) {
    let return_mes = new returnMessage();
    let message = req.body;
    let sql_message = {};
    if(!checkIsNull(message.name)){
        return_mes.state = -1;
        return_mes.data.cause = "名称不能为空";
    }
    sql_message.name = message.name;
    if(!checkIsNull(message.img_path)){
        return_mes.state = -1;
        return_mes.data.cause = "图片不能为空";
    }
    sql_message.img_path = message.img_path;
    if(checkIsNull(message.link)){
        sql_message.link = message.link;
    }
    let res1 = {};
    try{
       res1 =  db.add("walkings" , sql_message);
    }catch(err){
        return_mes.state = -3;
        save.save(err.message);
    }
    if(res1 == "-1"){
        return_mes.state = -3;
    }else{
        return_mes.state = 200;
        return_mes.data.message.info = "新建成功";
    }
    res.send(return_mes);
})

router.post('/change', async function(req , res , next){
    // get message
    let message = req.body;
    let return_mes = new returnMessage();

    // processing data
    if(message.link == "null"){
        delete message.link;
    }
    let data = {};
    data.id = message.id;
    delete message.id;
    
    // try updata
    try{
        await db.update("walkings" , data , message);
        return_mes.state = 200;
        return_mes.data.message = "修改成功";
    }catch(err){
        save.save(err);
        return_mes.state = -1;
        return_mes.data.cause = "修改失败";
    }
    res.send(return_mes);
})

module.exports = router;