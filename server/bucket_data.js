const mariadb=require('mariadb/callback');
const con=mariadb.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : 'bucket',
    //connectionLimit : 5,
    database : 'bucket'
});
module.exports=con;