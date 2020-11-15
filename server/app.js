var createError = require('http-errors');
const express = require('express');
const path = require('path');
const body = require('body-parser')
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

const routes = require('./routes')

const app = express();
const port = 5000;

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
