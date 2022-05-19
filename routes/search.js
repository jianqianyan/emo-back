// search interface
// 20221/05/12 author：qianyan

var express = require('express');
var router = express.Router();
const db = require("../untli/db/db");
const save = require("../untli/saveMessage/saveMessage")
const returnMessage = require("../model/returnMessage");
const { captureRejectionSymbol } = require('nodemailer/lib/xoauth2');

// search targets depend by information
router.get('/', async function (req, res, next) {
    let return_mes = new returnMessage();

    // permission verification can be added here

    // process infomation
    let search_message = req.query;
    let condition = {};
    if (search_message.condition)
        condition = JSON.parse(search_message.condition);
    let begin = 0,
        pageSize = 10;

    // process paging
    if (search_message.pageSize)
        pageSize = Number(search_message.pageSize);
    if (search_message.page)
        begin = (Number(search_message.page) - 1) * pageSize;

    // query data base
    let data = [];
    let dataNumber = 0;
    try {
        data = await db.fuzzyfind(search_message.table, condition, begin, pageSize);
        dataNumber = await db.fuzzyfindNumber(search_message.table, condition, begin, pageSize);
    } catch (err) {
        save.save(err , "search");
        return_mes.state = -3;
    }
    if (data.length != 0) {
        return_mes.state = 200;
        // Processing format
        data.forEach(item => {
            if(item.sex == 'N'){
                item.sex = "男";
            }
            else{
                item.sex = "女";
            }
            item.registe_time = item.registe_time.toISOString().replace('T' , ' ').replace('Z','')
        })
        return_mes.data.message = data;
        return_mes.data.messageNumber = dataNumber;
    } else if(return_mes.state != -3){
        return_mes.state = -1;
        return_mes.data.cause = "未查询到相关信息";
    }
    res.send(return_mes);
})

router.get('/first', async function (req, res, next) {
    let return_mes = new returnMessage();
    // permission verification can be added here

    // process infomation
    let message = req.query;
    let pageSize = 10;

    // If there are paging requirements ,default is 10
    if (message.pageSize) {
        pageSize = Number(message.pageSize);
    }
    let condition = {};
    // query data base
    let queryData = async function (table, condition, pageSize) {
        let return_mes = new returnMessage();
        let data = [];
        let dataNumber = 0;
        try {
            data = await db.fuzzyfind(table, condition, 0 , pageSize);
            dataNumber = await db.fuzzyfindNumber(table, condition, 0, pageSize);
        } catch (err) {
            save.save(err, "firstGet");
            return_mes.state = -3;
        }
        if (data.length != 0) {
            return_mes.state = 200;
            // Processing format
            return_mes.data.message = data;
            return_mes.data.messageNumber = dataNumber;
        } else if (return_mes.state != -3) {
            return_mes.state = -1;
            return_mes.data.cause = "未查询到相关信息";
        }
        // console.log(return_mes);
        return return_mes;
    }
    // For multiple group queries
    if (Array.isArray(message.table)) {
        return_mes.data.message = [];
        for(item of message.table){
            return_mes.data.message.push(message = await queryData(item, condition, pageSize));
        }
    }
    else{
        return_mes.data.message = await queryData(message.table , condition , pageSize);
    }
    res.send(return_mes);
})
module.exports = router;