var express = require('express');
var router = express.Router();
const mariadb = require('mariadb');
const pool = mariadb.createPool({
  host : '127.0.0.1',
  user : 'root',
  password : 'bucket',
  connectionLimit : 5,
  database : 'bucket'
});

const con = pool.getConnection();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('this is main');
});

// router.get('/:id', function(req, res)){
//   let id = req.route.params;
//   con.query("Select * from user_tb;")
//   .then((rows)=>{
//     if(rows.length){
//       res.send({lists: rows});
//     }
//   })
// }

module.exports = router;
