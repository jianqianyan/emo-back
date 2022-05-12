// search interface
// 20221/05/12 author：qianyan

var express = require('express');
var router = express.Router();
const db = require("../untli/db/db");
const save = require("../untli/saveMessage/saveMessage")
const returnMessage = require("../model/returnMessage")

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
    try {
        data = await db.fuzzyfind(search_message.table, condition, begin, pageSize);
    } catch (err) {
        save.save(err , "search");
        return_mes.state = -3;
    }
    if (data.length != 0) {
        return_mes.state = 200;
        return_mes.data.message = data;
    } else if(return_mes.state != -3){
        return_mes.state = -1;
    }
    res.send(return_mes);
})

module.exports = router;