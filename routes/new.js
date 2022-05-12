var express = require('express');
var router = express.Router();
const db = require("../untli/db/db");
const save = require("../untli/saveMessage/saveMessage")
var setToken = require('../untli/token/token');
const returnMessage = require("../model/returnMessage")
var untli = require('../untli/untli')

router.get('/', async function (req, res, next) {
    let return_mes = new returnMessage();

    // permission verification can be added here
    
    // process infomation
    let search_message = req.query;
    let condition = JSON.parse(search_message.condition);
    let begin = 0 , pageSize = 10;
    
    // process paging
    if(search_message.pageSize)
        pageSize = Number(search_message.pageSize);
    if(search_message.page)
        begin = (Number(search_message.page) - 1) * pageSize;
    
    // query data base
    let data;
    try{
        data = await db.fuzzyfind(search_message.table , condition , begin , pageSize);
    }catch(err){
        save.save(err);
    }
    return_mes.data.message = data;
    res.send(return_mes);
})
module.exports = router;