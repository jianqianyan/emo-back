var db = require("../untli/db/db");

// Can recommendation information be added
// cnt = 1 express add , cnt = 0 express delete 
async function checkAddRecommedInfo(id , cnt , maxn = 10){
    let table = "video_recommend";
    let data = await db.count(table);
    let data1 = Object.values(data[0])[0];
    
    // if recommendation list is full
    if(data1 >= maxn && cnt == 1){
        return true;
    }
    
    let message = {"video_id" : id};
    await db.emoDelete(table , message);
    if(cnt){
        await db.add(table , message);
    }
    else{
        await db.emoDelete(table , message);
    }
    return false;
}

module.exports = {
    checkAddRecommedInfo,
}