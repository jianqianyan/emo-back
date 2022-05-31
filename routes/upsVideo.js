var express = require('express');
var router = express.Router();
const db = require("../untli/db/db");
const returnMessage = require("../model/returnMessage")

// get video message by user id
router.get('/', async function (req, res, next) {
    let return_mes = new returnMessage();
    let id = req.query.id;
    let page = req.query.page, pageSize = req.query.pageSize;
    let table = "videos";
    return_mes.data.message = await db.find(table , {"up_id" : id} , page , pageSize);
    return_mes.data.messageNumber =  await db.findNumber(table , {"up_id" : id} , page , pageSize);
    res.send(return_mes);
})  

module.exports = router;