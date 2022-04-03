var express = require('express');
var router = express.Router();
var db = require('../db/db')
/* GET hello page. */
router.get('/',async function (req, res, next) {
  let data = {data:""};
  data.data = await db.find("authors","aaaa");
  res.send(data);  
});

module.exports = router;