var express = require('express');
var router = express.Router();
const db = require("../untli/db/db");
const save = require("../untli/saveMessage/saveMessage")
const returnMessage = require("../model/returnMessage");
const {
    checkAddRecommedInfo
} = require('../service/changeService');

router.post('/', async function (req, res, next) {
    // get message
    let message = req.body;
    let return_mes = new returnMessage();

    // which table need to be changed
    let table = message.table;

    // which objcet need to be changed
    let obj = {};
    obj.id = message.id;

    // Information that needs to be changed
    let condition = message.condition;
    if (typeof condition == "string") condition = JSON.parse(message.condition);
    // When modifying the recommendation information, 
    // check whether it can be modified
    if ((typeof condition.is_recommend).toString() != "undefined") {
        if (table == "videos" && await checkAddRecommedInfo(obj.id , condition.is_recommend , 11)) {
            return_mes.state = -1;
            return_mes.data.cause = "推荐视频列表已满";
            res.send(return_mes);
            return ;
        }
        
    }
    // try update
    try {
        await db.update(table, obj, condition);
        return_mes.state = 200;
        return_mes.data.message = "修改成功";
    } catch (err) {
        save.save(err, "change");
        return_mes.state = -1;
        return_mes.data.cause = "修改失败"
    }
    res.send(return_mes);
})


module.exports = router;