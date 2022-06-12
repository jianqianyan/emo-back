var express = require('express');
var router = express.Router();
const db = require("../untli/db/db");
const save = require("../untli/saveMessage/saveMessage")
const returnMessage = require("../model/returnMessage")
const {
    checkIsNull
} = require("../untli/untli")

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

module.exports = router;