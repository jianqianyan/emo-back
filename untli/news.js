// test
var db = require(`./db/sqlsever`);
const {
    save
} = require("./saveMessage/saveMessage");
const {
    getsqlDate
} = require("./untli");

// Create data
async function addUser() {
    let name = "",
        password = "",
        sex = "",
        phone = "",
        information = "",
        email = "",
        img_path = "";
    let sqlstr;
    let myRandom = function (max, min) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    for (let i = 10198; i <= 20197; ++i) {
        sqlstr = `insert into users(name , password , sex , phone , information , registe_time , email , img_path) values('`;
        phone = i;
        let Len = myRandom(10, 1);
        name = "";
        for (let j = 0; j < Len; ++j) {
            let d = myRandom(25, 0);
            name += String.fromCharCode('a'.charCodeAt() + d);
        }
        password = "";
        Len = myRandom(10, 1);
        for (let j = 0; j < Len; ++j) {
            let d = myRandom(25, 0);
            password += String.fromCharCode('a'.charCodeAt() + d);
        }
        sex = "";
        Len = myRandom(1, 0);
        if (Len == 1) sex = "N";
        else sex = "W";
        information = "";
        Len = myRandom(20, 1);
        for (let j = 0; j < Len; ++j) {
            let d = myRandom(25, 0);
            information += String.fromCharCode('a'.charCodeAt() + d);
        }
        email = "";
        Len = myRandom(10, 1);
        for (let j = 0; j < Len; ++j) {
            let d = myRandom(25, 0);
            email += String.fromCharCode('a'.charCodeAt() + d);
        }
        email += '@';
        Len = myRandom(3, 1);
        for (let j = 0; j < Len; ++j) {
            let d = myRandom(9, 0);
            email += d;
        }
        email += ".com";
        img_path = "";
        Len = myRandom(10, 1);
        for (let j = 0; j < Len; ++j) {
            let d = myRandom(25, 0);
            img_path += String.fromCharCode('a'.charCodeAt() + d);
        }
        let registe_time = getsqlDate();
        img_path += ".jpg";
        sqlstr += name;
        sqlstr += `','`;
        sqlstr += password;
        sqlstr += `','`;
        sqlstr += sex;
        sqlstr += `','`;
        sqlstr += phone;
        sqlstr += `','`;
        sqlstr += information;
        sqlstr += `','`;
        sqlstr += registe_time;
        sqlstr += `','`;
        sqlstr += email;
        sqlstr += `','`;
        sqlstr += img_path;
        sqlstr += `');`;
        console.log(sqlstr);
        try {
            await db(sqlstr);
        } catch (err) {
            save.save(err.message, "add");
        }
    }

}

async function addVideo() {
    let sqlstr;
    let myRandom = function (max, min) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    for (let i = 0; i <= 10000; ++i) {
        sqlstr = `insert into videos(name , cover , path , type , tag , up_id , up_name , information , upload_time) values('`;
        let len = myRandom(10, 1);
        let name = "";
        for (let j = 0; j < len; ++j) {
            let d = myRandom(25, 0);
            name += String.fromCharCode('a'.charCodeAt() + d);
        }
        sqlstr += name;
        sqlstr += `','`;
        let cover = "/";
        len = myRandom(5, 1);
        for (let j = 0; j < len; ++j) {
            let d = myRandom(25, 0);
            cover += String.fromCharCode('a'.charCodeAt() + d);
        }
        cover += '.png';
        sqlstr += cover;
        sqlstr += `','`;
        let path = "";
        len = myRandom(5, 1);
        for (let j = 0; j < len; ++j) {
            let d = myRandom(25, 0);
            path += String.fromCharCode('a'.charCodeAt() + d);
        }
        path += '.mp4'
        sqlstr += path;
        sqlstr += `','`;
        let type = "";
        len = myRandom(5, 1);
        for (let j = 0; j < len; ++j) {
            let d = myRandom(25, 0);
            type += String.fromCharCode('a'.charCodeAt() + d);
        }
        sqlstr += type;
        sqlstr += `','`;
        len = myRandom(10, 1);
        let tag = "";
        for (let j = 0; j < len; ++j) {
            tag += "#";
            let len1 = myRandom(5, 1);
            for (let k = 0; k < len1; ++k) {
                let d = myRandom(25, 0);
                tag += String.fromCharCode('a'.charCodeAt() + d);
            }
        }
        sqlstr += tag;
        sqlstr += `',`;
        let up_id = 0;
        up_id = myRandom(10000, 0);
        sqlstr += up_id;
        sqlstr += `,'`;
        let up_name = "";
        len = myRandom(10, 1);
        for (let j = 0; j < len; ++j) {
            let d = myRandom(25, 0);
            up_name += String.fromCharCode('a'.charCodeAt() + d);
        }
        sqlstr += up_name;
        sqlstr += `','`;
        let information = "";
        len = myRandom(10, 1);
        for (let j = 0; j < len; ++j) {
            let d = myRandom(25, 0);
            information += String.fromCharCode('a'.charCodeAt() + d);
        }
        sqlstr += information;
        sqlstr += `','`;
        upload_time = getsqlDate();
        sqlstr += upload_time;
        sqlstr += `');`;
        // console.log(sqlstr);
        try {
            await db(sqlstr);
        } catch (err) {
            save.save(err.message, "add");
        }
        console.log(i + "/10000");
    }
}

module.exports.add = addUser;
module.exports.addVideo = addVideo;