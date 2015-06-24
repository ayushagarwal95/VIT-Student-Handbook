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
/* TODO
 router.get('/suggestions', function (request, response) {
 var collection = request.db.collection('articles');
 var regNo = request.query.regno;
 var category = request.query.category;
 var query = {};
 query['main_category'] = category;
 //query['tags'] =
 collection.find(query).toArray(function (err, docs) {
 if (err) {
 response.status(500).send('Internal Server Error');
 }
 else {
 response.json(docs);
 }
 });
 });*/

router.get('/search', function (request, response) {
    var searchText = request.query.tag;
    var collection = request.db.collection('articles');
    var query = {}
    query['tags'] = {'$regex': '*.;' + searchText + ';.*'};
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
    var collection = request.db.collection('articles');
    var m_category = request.query.main_category;
    var s_category = request.query.sub_category;
    if (m_category) {
        collection.find({main_category: m_category}).toArray(function (err, docs) {
            if (err) {
                response.status(500).send('Internal Server Error');
            }
            else {
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
