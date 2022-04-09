function getsqlDate(){
    let nowData = new Date();
    let year = nowData.getFullYear();
    let month = nowData.getMonth() + 1;
    let day = nowData.getDate();
    let sqlDate = year + '-' + month + '-' + day ;
    return sqlDate;
}

module.exports.getsqlDate = getsqlDate;