var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var path = require('path');

require('./app_api/models/users');
require('./app_api/config/passport');

var routesApi = require('./app_api/routes/routing');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
// [SH] Set the app_client folder to serve static resourcess
app.use(express.static(path.join(__dirname, 'app_client')));


app.use(passport.initialize());
app.use('/api', routesApi);

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});


app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;