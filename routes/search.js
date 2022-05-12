// search interface
// 20221/05/12 author：qianyan

var express = require('express');
var router = express.Router();
const returnMessage = require("../model/returnMessage")

// search targets depend by information
router.get('/', async function (req, res, next) {
    let return_mes = new returnMessage();

    // permission verification can be added here
    
    // process infomation
    let search_message = req.params;
    console.log(search_message);
})

module.exports = router;
