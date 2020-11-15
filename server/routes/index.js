const express = require('express');
const router = express.Router();

const main = require('./main.js');
const user = require('./users.js');

router.use('/main', main);
router.use('/user', user);


router.get('/', function(req, res){
    res.send('This is Root');
})

module.exports = router;
