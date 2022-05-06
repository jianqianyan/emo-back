var express = require('express');
var router = express.Router();
const svgCaptcha = require("svg-captcha")
// 验证码
router.get('/', async (req, res) => {
    const captcha = svgCaptcha.create({
        noise: 3, //干扰线数量
    });
    req.session.img_code = captcha.text;
    res.type('svg');
    res.send(captcha.data);
});

module.exports = router;