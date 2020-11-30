const express = require('express');
const router = express.Router();
const main = require('./main.js');
const user = require('./users.js');
const join = require('./join.js');

router.use('/main', main);
router.use('/user', user);
router.use('/join', join);

const lists =[
  {
      bid : 1,
      title : '버킷리스트1',
      status : 1,
  },
  {
      bid : 2,
      title : '버킷리스트2',
      status : 1,
  },
  {
      bid : 3,
      title : '버킷리스트3',
      status : 0,
  }
]

router.get('/', function(req, res){
  res.send({
    status : 200,
    lists : lists});
})

module.exports = router;
