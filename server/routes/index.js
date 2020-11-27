const express = require('express');
const router = express.Router();
const main = require('./main.js');
const user = require('./users.js');

router.use('/main', main);
router.use('/user', user);

router.get('/', function(req, res){
  res.send({
      text : "Hello this is Text1",
      text2 : "Hello This is TExt22222"
  });
})

module.exports = router;
