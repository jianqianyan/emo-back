// 将时间转换为sql格式时间
function getsqlDate() {
    let nowData = new Date();
    let year = nowData.getFullYear();
    let month = nowData.getMonth() + 1;
    let day = nowData.getDate();
    let hour = nowData.getHours();
    let min = nowData.getMinutes();
    let sec = nowData.getSeconds();
    let sqlDate = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
    return sqlDate;
}

function checkIsNull(obj) {
    let ans = false;
    if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; ++i) {
            if (typeof obj[i] == "undefined") {
                ans = true;
                break;
            }
        }
    } else {
        if (typeof obj == "undefined") {
            ans = true;
        }
    }
    return ans;
}

module.exports.getsqlDate = getsqlDate;
module.exports.checkIsNull = checkIsNull;