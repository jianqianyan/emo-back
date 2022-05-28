var express = require('express');
var router = express.Router();
const db = require("../untli/db/db");
const save = require("../untli/saveMessage/saveMessage")
var setToken = require('../untli/token/token');
const returnMessage = require("../model/returnMessage")
var untli = require('../untli/untli')


router.post('/', async function (req, res, next) {
    let return_mes = new returnMessage();
    let message = req.body;
    message.upload_time = untli.getsqlDate();
    let table = "videos";
    let data = await db.add(table , message);
    console.log(data);
    return_mes.data.message = "OK";
    res.send(return_mes);
})

module.exports = router;