var express = require('express');
var router = express.Router();
const db = require("../untli/db/db");
const save = require("../untli/saveMessage/saveMessage")
const returnMessage = require("../model/returnMessage")
const untli = require("../untli/untli.js")

// 获取视频信息
router.get('/', async function (req, res, next) {
    let video_message = req.query;
    let video = [];
    var return_mes = new returnMessage();
    if (untli.checkIsNull(video_message.id)) {
        return_mes.state = -1;
        return_mes.data.cause = "视频id不能为空";
        res.send(return_mes);
        return;
    }
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
        return_mes.data.message.upload_time = return_mes.data.message.upload_time.toISOString().replace('T', ' ').replace('Z', '');
    }
    res.send(return_mes);
})
module.exports = router;