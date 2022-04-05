const { del } = require("express/lib/application");
var db = require(`./sqlsever`);

// 从oudide里根据message查找
async function find(outside, message) {
    let sqlstr = `select * from ` + outside;
    if (message) {
        sqlstr += ` where `
        let sql1 = ``,
            sql2 = ``;
        Object.keys(message).forEach((key) => {
            if (sql1 != ``) sql1 += ` and `;
            sql1 = sql1 + key + `='` + message[key] + `'`;
        })
        sqlstr = sqlstr + sql1;
    }
    var data = {};
    try {
        data = await db(sqlstr);
    } catch (err) {
        console.log(err);
    }
    return data;
}

// 插入数据 往表outside中插入数据message
async function add(outside, message) {
    // 拼接字符串
    let sqlstr = `insert into ` + outside + `(`;
    let sql1 = ``,
        sql2 = ``;
    Object.keys(message).forEach((key) => {
        if (sql1 != ``) sql1 += `,`;
        if (sql2 != ``) sql2 += `,`;
        sql1 = sql1 + key;
        sql2 = sql2 + `'` + message[key] + `'`;
    })
    sqlstr = sqlstr + sql1 + `) values(` + sql2 + `);`;
    var data = 0;
    data = await db(sqlstr);
    // console.log(data);
    return data;
}

// 更改数据 更改表outside中的target的message数据
async function update(outside, target, message) {
    let sqlstr = `update ` + outside + ` set `;
    let sql1 = ``,
        sql2 = ``;
    Object.keys(message).forEach((key) => {
        if (sql1 != ``) sql1 += `,`;
        sql1 = sql1 + key + `='` + message[key] + `'`;
    })
    Object.keys(target).forEach((key) => {
        if (sql2 != ``) sql2 += ` AND `;
        sql2 = sql2 + key + `=` + target[key];
    })
    sql2 = ` where ` + sql2;
    sqlstr = sqlstr + sql1 + sql2;
    console.log(sqlstr);
}

// 删除数据 在表ouside中删除根据message删除数据
async function delect(outside , message){
    let sqlstr = `delect from ` + outside + ` where `;
    let sql1 = ``;
    Object.keys(message).forEach((key) => {
        if(sql1 != ``)  sql1 += ` AND `;
        sql1 = sql1 + key + `=` + message[key] + ``;
    })
    sqlstr = sqlstr + sql1;
    console.log(sqlstr);
}

module.exports.find = find
module.exports.add = add
module.exports.update = update
module.exports.delect = delect