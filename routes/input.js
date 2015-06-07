'use strict';
var express = require('express');

var router = express.Router();

router.get('/', function (request, response) {
    response.render('input', {message: null, results: null});
});

router.post('/new', function (request, response) {
    var collection = request.db.collection('articles');
    var article = {
        main_category: request.body.m_category,
        sub_category: request.body.s_category,
        sub_sub_category: request.body.ss_category,
        topic: request.body.topic,
        heading: request.body.heading,
        content: request.body.contentText,
        tags: request.body.tag,
        timestamp: new Date()
    };
    var onInsert = function (err) {
        if (err) {
            console.log('error: ' + err);
        }
        else {
            response.render('input', {message: 'Inserted', results: null})
        }
    }
    collection.insertOne(article, onInsert);
});

router.post('/find', function (request, response) {
    var collection = request.db.collection('articles');
    var topic = request.body.topic;
    var onSearch = function (err, docs) {
        if (err) {
            console.log('error: ' + err);
        }
        else if (docs.length === 0) {
            response.render('input', {message: 'Not Found', results: null});
        }
        else {
            response.render('input', {results: docs, message: 'Search Successful'});
        }
    };
    collection.find({topic: topic}, onSearch);
});

router.post('/edit', function (request, response) {
    var collection = request.db.collection('articles');
    var updateCollection = request.db.collection('updates');
    var newArticle = {
        main_category: request.body.m_category,
        sub_category: request.body.s_category,
        sub_sub_category: request.body.ss_category,
        topic: request.body.topic,
        heading: request.body.heading,
        content: request.body.contentText,
        tags: request.body.tag
    };
    var onUpdate = function (err) {
        if (err) {
            console.log('error: ' + err);
        }
        else {
            response.render('input', {message: 'Updated', results: null});
            var updateInfo = {
                topic: topic,
                timestamp: new Date()
            };
            var onFinish = function (err) {
                if (err) {
                    console.log('error: ' + err);
                }
            }
            updateCollection.findAndModify({topic: updateInfo.topic},
                {$set: {timestamp: updateInfo.timestamp}},
                {
                    safe: true,
                    new: true,
                    upsert: true
                }, onFinish);
        }
    };
    collection.findAndModify({topic: newArticle.topic},
        {
            $set: {
                main_category: newArticle.main_category,
                sub_category: newArticle.sub_category,
                sub_sub_category: newArticle.sub_sub_category,
                heading: newArticle.heading,
                content: newArticle.content,
                tags: newArticle.tags
            }
        },
        {
            safe: true,
            new: true,
            upsert: true
        }, onUpdate
    );
});

router.post('/delete', function (request, response) {
    var collection = request.db.collection('articles');
    var topic = request.body.topic;
    var onDelete = function (err, results) {
        if (err) {
            console.log('error: ' + err);
        }
        else {
            console.log(results);
            response.render('input', {message: 'Deleted', results: null});
        }
    };
    collection.remove({topic: topic}, onDelete);
});

module.exports = router;
