// 将时间转换为sql格式时间
function getsqlDate(){
    let nowData = new Date();
    let year = nowData.getFullYear();
    let month = nowData.getMonth() + 1;
    let day = nowData.getDate();
    let sqlDate = year + '-' + month + '-' + day ;
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