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
    let data = await db.fuzzyfind(search_message.table , condition);
    return_mes.data.message = data;
    res.send(return_mes);
})
module.exports = router;