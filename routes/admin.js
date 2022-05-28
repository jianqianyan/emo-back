var express = require('express');
var router = express.Router();
const db = require("../untli/db/db");
const save = require("../untli/saveMessage/saveMessage")
const returnMessage = require("../model/returnMessage");


// set recommed video
router.get('/recommedVideoSet', async function (req, res, next) {
    // permission verification can be added here

    let return_mes = new returnMessage();
    // process infomation

    // query data base
    let data = [];
    let sqlstr = ` select * from videos,video_recommend where videos.id = video_recommend.video_id`;

    try {
        data  = await db.linkQuery(sqlstr);
    } catch (err) {
        save.save(err.message, "search");
        return_mes.state = -3;
    }
    if(data.length != 0){
        data.forEach(item => {
            item.id = item.video_id;
            delete item.video_id;
        })
        return_mes.state = 200;
        return_mes.data.message = data;
        return_mes.data.messageNumber = 1;
    }
    else if(return_mes.state != -3){
        return_mes.state = -1;
        return_mes.data.cause = "未查询到相关信息";
    }
    res.send(return_mes);
})

module.exports = router;