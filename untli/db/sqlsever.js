var mssql = require(`mssql`);
var config = require('../../settingConfig/sqlConfig')
const fs = require('fs');
var dbConfig = {
    user: ``, //用户名
    password: ``, //密码
    server: ``, //服务器ip
    database: ``, //数据库名称
    port: 1433, //端口 默认1433
    pool: {
        min: 0,
        max: 10,
        idleTimeoutMillis: 3000
    },
    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
}

var db = async (sqlstr) => {
    dbConfig = config;
    try {
        await mssql.connect(dbConfig);
        const result = await mssql.query(sqlstr)
        return result.recordset;
    } catch (err) {
        // 请求失败
        console.log(err);
        if (err.name == "RequestError")
            return -1;
        return -2;
    }
}
module.exports = db