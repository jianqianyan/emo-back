var db = require(`./sqlsever`);

// 用户登录
async function login(outside , phone) {
    let sqlstr = `select * from users where phone='`+phone+`'`;
    var data = {};
    data = await db(sqlstr);
    return data;
}


async function find(outside, name) {
    let sqlstr = ``
    if (name) {
        sqlstr = `select * from ` + outside + ` where ` + outside + `.name='` + name + `'`;
    } else {
        sqlstr = `select * from ` + outside;
    }
    // console.log(sqlstr)
    var data = {};
    data = await db(sqlstr);
    return data;
}

module.exports.find = find
module.exports.login = login