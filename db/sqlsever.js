var mssql = require(`mssql`);
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
 
var db = async (sqlstr) =>{
    return new Promise((resolve , reject) => {
        fs.readFile(__dirname + '/dbms.json','utf-8' , (err , result) => {
            if(err){
                console.log(err);
                reject(err);
            }
            let text = JSON.parse(result);
            console.log(text);
            dbConfig = text;
            resolve(result);
        })
    })
    .then(async function(data){
        try{  
            await mssql.connect(dbConfig);
            const result = await mssql.query(sqlstr)
            return result.recordset;
        }
        catch(err){
            console.log(err);
        }
    })
}
module.exports = db