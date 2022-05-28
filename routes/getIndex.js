var express = require('express');
var router = express.Router();
const db = require("../untli/db/db");
const returnMessage = require("../model/returnMessage");


// set recommed video
router.get('/', async function (req, res, next) {
    let return_mes = new returnMessage();
    let table = "video_recommend";
    // Get recommendation list
    let data = await db.find(table);
    return_mes.data.message = [];
    // Get corresponding video information
    for (var item of data) {
        let video = await db.find("videos", {
            "id": item.video_id
        });
        video = video[0];
        // package information
        video.tag = video.tag.split("#");
        video.tag.shift();
        video.upload_time = video.upload_time.toISOString().replace("T", " ").replace("Z", "");
        return_mes.data.message.push(video);
    }
    return_mes.data.messageNumber = data.length;
    res.send(return_mes);
})

module.exports = router;