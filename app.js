'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var session = require('express-session');
var multer = require('multer');

var webRoutes = require(path.join(__dirname, 'routes', 'web'));
var apiRoutes = require(path.join(__dirname, 'routes', 'api'));
var inputRoutes = require(path.join(__dirname, 'routes', 'input'));

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: '11235813',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({
    dest: './public/images',
    rename: function (fieldname, filename) {
        return filename.replace(/\s+/g,"-").toLowerCase();
    },
    limits: {
        files: 1
    }
}));

var mongoURI = process.env.MONGO_LAB_URI || 'mongodb://127.0.0.1/handbook';
var mongodbOptions = {
    db: {
        native_parser: true,
        recordQueryStats: true,
        retryMiliSeconds: 500,
        numberOfRetries: 10
    },
    server: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 10000
        },
        auto_reconnect: true,
        poolSize: 50
    }
};
var mongo;
var onConnect = function (err, db) {
  if(err)
  {
    console.log("unable to connect to mongodb error :" + err);
  }
  else {
    mongo = db;
  }
};

mongoClient.connect(mongoURI, mongodbOptions, onConnect);
app.use(function (request, response, next) {
    request.db = mongo;
    next();
});
app.use('/', webRoutes);
app.use('/api', apiRoutes);
app.use('/input', inputRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
