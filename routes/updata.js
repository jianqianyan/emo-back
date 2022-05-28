var express = require('express');
var router = express.Router();
const multer = require('multer');
const returnMessage = require("../model/returnMessage")

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/image')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

var upload = multer({
    storage: storage
})

router.post('/', upload.single('img'), async function (req, res, next) {
    let return_mes = new returnMessage();
    return_mes.state = 200;
    let path = req.file.filename;
    return_mes.data.message.path = path;
    res.send(return_mes);
})

module.exports = router;