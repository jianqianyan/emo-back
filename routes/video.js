var express = require('express');
var router = express.Router();
const fs = require('fs');
const db = require('../untli/db/db');
const videoCount = require("../service/videoService");

// 获取视频信息
router.get('/getmessage', async function (req, res, next) {
    let message = req.query;
    let video_id = message.video_id;
    // console.log(video_id);
    let video = {},
        retunmes = {};
    retunmes.statue = 200;
    try {
        video = await db.find("videos", {
            "id": video_id
        });
    } catch (err) {
        console.log(err.message)
        retunmes.data = -2;
    };
    if (video.length == 0) {
        // 表示没找到
        retunmes.data = -1;
    } else {
        // 包装返回信息
        // console.log(video[0]);
        // video.upload_time.toString();
        video[0].upload_time = video[0].upload_time.toISOString().replace('T', ' ').replace('Z', '');
        // console.log(video[0].upload_time);
        retunmes.data = video[0];


    }
    res.send(retunmes);
})

// 流式传输视频
router.get('/', async function (req, res, next) {
    let path = req.query.path;
    let filePath = './assets/video/' + path;
    try {
        let stat = fs.statSync(filePath);
        let fileSize = stat.size;
        let range = req.headers.range;
        if (range) {
            // 有range头才使用206状态码            
            let parts = range.replace(/bytes=/, "").split("-");
            let start = parseInt(parts[0], 10);
            let end = parts[1] ? parseInt(parts[1], 10) : start + 999999;

            if (start == 0) {
                let video;
                try {
                    video = await db.find("videos", {
                        "path": path
                    });
                } catch (err) {
                    console.log(err);
                }
                // 这里可以加上对于已经被删除的视频的播放限制
                if (video.length > 0) {
                    videoCount.videoCount(video[0].id);
                    
                } else {}
            }
            // end 在最后取值为 fileSize - 1 
            end = end > fileSize - 1 ? fileSize - 1 : end;

            let chunksize = (end - start) + 1;
            let file = fs.createReadStream(filePath, {
                start,
                end
            });
            let head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            let head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            fs.createReadStream(filePath).pipe(res);
        }
    } catch (err) {
        console.log(err);
    }
})
module.exports = router;