var express = require('express');
var router = express.Router();
var db = require('../untli/db/db')
var setToken = require('../untli/token/token')
/* GET users listing. */

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  console.log(req.user);
});


module.exports = router;
