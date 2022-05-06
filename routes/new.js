var express = require('express');
var router = express.Router();
const db = require("../untli/db/db");
const save = require("../untli/saveMessage/saveMessage")
var setToken = require('../untli/token/token');
const returnMessage = require("../model/returnMessage")
var untli = require('../untli/untli')

router.get('/', async function (req, res, next) {
    let video_message = req.query;
    let video = [];
    var return_mes = new returnMessage();
    // 尝试查找video
    try {
        video = await db.find("videos", {
            "id": video_message.id,
        })
    } catch (err) {
        save.save(err);
        return_mes.state = -3;
    }
    if (video.length == 0) {
        return_mes.state = -1;
        return_mes.data.cause = "视频不存在";
    } else {
        return_mes.state = 200;
        return_mes.data.message = video[0];
        // 封装返回信息
        return_mes.data.message.upload_time = return_mes.data.message.upload_time.toISOString().replace('T' , ' ').replace('Z' , '');
    }
    res.send(return_mes);
})
module.exports = router;