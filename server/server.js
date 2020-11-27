var createError = require('http-errors');
const express = require('express');
const path = require('path');
const body = require('body-parser');
const cors = require('cors');
// const mariadb = require('mariadb');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

//passport 모듈 설정
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var session=require('express-session');
var flash=require('connect-flash');
const routes = require('./routes')
// const pool = mariadb.createPool({
//     host : '127.0.0.1',
//     user : 'root',
//     password : 'bucket',
//     connectionLimit : 5,
//     database : 'bucket'
// });

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, function(){
    console.log('Listening on port : '+ port);
});

//passport 세션설정
app.use(session({
  secret:'bucketbucket1234',
  resave:false,
  saveUninitialized:true
}))

//passport 사용설정
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());