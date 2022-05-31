// search interface
// 20221/05/12 author：qianyan

var express = require('express');
var router = express.Router();
const db = require("../untli/db/db");
const save = require("../untli/saveMessage/saveMessage")
const returnMessage = require("../model/returnMessage");

// search targets depend by information
router.get('/', async function (req, res, next) {
    let return_mes = new returnMessage();
    // permission verification can be added here

    // process infomation
    let message = req.query;

    let begin = 0,
        pageSize = 10;

    // process paging
    if (message.pageSize) pageSize = Number(message.pageSize);
    if (message.page) begin = (Number(message.page) - 1) * pageSize;
    // query data base
    let queryData = async function (table, condition, begin, pageSize) {
        let return_mes = new returnMessage();
        let data = [];
        let dataNumber = 0;
        try {
            data = await db.fuzzyfind(table, condition, begin, pageSize);
            dataNumber = await db.fuzzyfindNumber(table, condition, 0, pageSize);
        } catch (err) {
            save.save(err.message, "search");
            return_mes.state = -3;
        }
        if (data.length != 0) {
            return_mes.state = 200;
            return_mes.data.message = data;
            return_mes.data.messageNumber = dataNumber;
        } else if (return_mes.state != -3) {
            return_mes.state = -1;
            return_mes.data.cause = "未查询到相关信息";
        }
        return return_mes;
    }
    // If there are multiple
    if (Array.isArray(message.table)) {
        return_mes.data.message = [];
        let len = message.table.length;

        for (let i = 0; i < len; ++i) {
            let condition = {};

            if (Array.isArray(message.condition) && message.condition[i]) {
                if (typeof message.condition[i] == "string")
                    condition = JSON.parse(message.condition[i]);
                else
                    condition = message.condition[i];
            }
            let table = message.table[i];
            return_mes.data.message.push(await queryData(table, condition, begin, pageSize));

        }

    } else {
        let condition = {};
        if (message.condition) {
            if (typeof message.condition == "string")
                condition = JSON.parse(message.condition);
            else
                condition = message.condition;
        }
        return_mes.data.message = await queryData(message.table, condition, begin, pageSize);
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
            data = await db.fuzzyfind(table, condition, 0, pageSize);
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
        for (item of message.table) {
            return_mes.data.message.push(message = await queryData(item, condition, pageSize));
        }
    } else {
        return_mes.data.message = await queryData(message.table, condition, pageSize);
    }
    res.send(return_mes);
})

router.get('/PreSearch', async function (req, res, next) {
    let return_mes = new returnMessage();
    // permission verification can be added here

    // process infomation
    let message = req.query;

    let begin = 0,
        pageSize = 10;

    // process paging
    if (message.pageSize) pageSize = Number(message.pageSize);
    if (message.page) begin = (Number(message.page) - 1) * pageSize;
    // query data base
    let queryData = async function (table, condition, begin, pageSize) {
        let return_mes = new returnMessage();
        let data = [];
        let dataNumber = 0;
        try {
            data = await db.find(table, condition, begin, pageSize);
            dataNumber = await db.findNumber(table, condition, 0, pageSize);
        } catch (err) {
            save.save(err.message, "search");
            return_mes.state = -3;
        }
        if (data.length != 0) {
            return_mes.state = 200;
            return_mes.data.message = data;
            return_mes.data.messageNumber = dataNumber;
        } else if (return_mes.state != -3) {
            return_mes.state = -1;
            return_mes.data.cause = "未查询到相关信息";
        }
        return return_mes;
    }
    // If there are multiple
    if (Array.isArray(message.table)) {
        return_mes.data.message = [];
        let len = message.table.length;

        for (let i = 0; i < len; ++i) {
            let condition = {};

            if (Array.isArray(message.condition) && message.condition[i]) {
                if (typeof message.condition[i] == "string")
                    condition = JSON.parse(message.condition[i]);
                else
                    condition = message.condition[i];
            }
            let table = message.table[i];
            return_mes.data.message.push(await queryData(table, condition, begin, pageSize));

        }

    } else {
        let condition = {};
        if (message.condition) {
            if (typeof message.condition == "string")
                condition = JSON.parse(message.condition);
            else
                condition = message.condition;
        }
        return_mes.data.message = await queryData(message.table, condition, begin, pageSize);
    }
    res.send(return_mes);
})

module.exports = router;