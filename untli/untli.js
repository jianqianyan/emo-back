// 将时间转换为sql格式时间
function getsqlDate(){
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
function checkIsNull(obj){
    if(typeof obj == "undefined"){
        return true;
    }
    return false;
}

module.exports.getsqlDate = getsqlDate;
module.exports.checkIsNull = checkIsNull;