'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function (request, response) {
    response.render('index');
});
router.get('/main', function (req, res) {
    res.render('main');
});
router.get('/results', function (req, res) {
    res.render('results');
});
router.get('/browse', function (req, res) {
    res.render('browse');
});

router.get('/suggestions', function (request, response) {
    var collection = request.db.collection('articles');
    var limit = 5;
    var skip;
    var onFind = function (err, docs) {
        if (err) {
            response.status(500).send('Internal Server Error');
        }
        else {
            response.json(docs);
        }
    };
    var onCount = function (err, count) {
        if (err) {
            console.log(err);
        }
        else {
            skip = Math.floor((Math.random() * 101)) % count;
            collection.find().limit(limit).skip(skip).toArray(onFind);
        }
    };
    collection.count(onCount);
});

router.get('/search', function (request, response) {
    var searchText = request.query.tag;
    var collection = request.db.collection('articles');
    collection.find({
        '$text': {
            '$search': searchText
        }
    }).toArray(function (err, docs) {
        if (err) {
            response.status(500).send('Internal Server Error');
        }
        else {
            console.log(docs);
            response.json(docs);
        }
    });
});

router.get('/articles', function (request, response) {
    // Website you wish to allow to connect
    response.header('Access-Control-Allow-Origin', 'http://localhost:63342');

    // Request methods you wish to allow
    response.header('Access-Control-Allow-Methods', 'GET');

    // Request headers you wish to allow
    response.header('Access-Control-Allow-Headers', 'X-Requested-With');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.header('Access-Control-Allow-Credentials', false);
    var collection = request.db.collection('articles');
    var m_category = request.query.main_category;
    var s_category = request.query.sub_category;
    if (m_category) {
        collection.find({main_category: m_category}).toArray(function (err, docs) {
            if (err) {
                response.status(500).send('Internal Server Error');
            }
            else {
                log.log(docs.length);
                response.json(docs);
            }
        });
    }
    else {
        collection.find({sub_category: s_category}).toArray(function (err, docs) {
            if (err) {
                response.status(500).send('Internal Server Error');
            }
            else {
                response.json(docs);
            }
        });
    }
});

module.exports = router;
