var db = require(`./sqlsever`);

// 从oudide里根据message查找
async function find(outside, message) {
    let sqlstr = `select * from ` + outside;
    if(message){
        sqlstr += ` where `
        let sql1 = `` , sql2 = ``;
        Object.keys(message).forEach((key) => {
            if(sql1 != ``) sql1 += ` and `;
            sql1 = sql1 + key + `='` + message[key] + `'`;
        })
        sqlstr = sqlstr + sql1;
    }
    var data = {};
    try{
        data = await db(sqlstr);
    }
    catch(err){
        console.log(err);
    }
    return data;
}

// 插入数据
async function add(outside , message){
    // 拼接字符串
    let sqlstr = `insert into ` + outside + `(`;
    let sql1 = `` , sql2 = ``;
    Object.keys(message).forEach((key) => {
        if(sql1 != ``)sql1 += `,`;
        if(sql2 != ``)sql2 += `,`;
        sql1 = sql1 +  key ;
        sql2 = sql2 + `'` + message[key] + `'`;
    })
    sqlstr = sqlstr + sql1 + `) values(` + sql2 + `);`;
    var data = 0;
    data = await db(sqlstr);
    // console.log(data);
    return data;
}

module.exports.find = find
module.exports.add = add