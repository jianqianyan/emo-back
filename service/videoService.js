var db = require("../untli/db/db");
// 计数，记录视频访问了多少次
function videoCount(id){
    let target = {
        id: id
    };
    let message = {
        views: "views + 1",
    }
    db.update("videos" , target , message);
}

module.exports.videoCount = videoCount;