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
    collection.insert(article, onInsert);
});

router.post('/find', function (request, response) {
    var collection = request.db.collection('articles');
    var topic = request.body.f_topic;
    var onSearch = function (err, docs) {
        if (err) {
            console.log('error: ' + err);
        }
        else if (docs === null) {
            response.render('input', {message: 'Not Found', results: null});
        }
        else {
            console.log(docs);
            response.render('input', {results: docs, message: 'Search Successful'});
        }
    };
    collection.findOne({topic: topic}, onSearch);
});

router.post('/edit', function (request, response) {
    var collection = request.db.collection('articles');
    var updateCollection = request.db.collection('updates');
    var newArticle = {
        main_category: request.body.e_m_category,
        sub_category: request.body.e_s_category,
        sub_sub_category: request.body.e_ss_category,
        topic: request.body.e_topic,
        heading: request.body.e_heading,
        content: request.body.e_contentText,
        tags: request.body.e_tag,
        timestamp: new Date()
    };
    var onUpdate = function (err) {
        if (err) {
            console.log('error: ' + err);
        }
        else {
            response.render('input', {message: 'Updated', results: null});
            var updateInfo = {
                topic: newArticle.topic,
                timestamp: new Date()
            };
            var onFinish = function (err) {
                if (err) {
                    console.log('error: ' + err);
                }
            }
            updateCollection.findAndModify({topic: updateInfo.topic},[['topic','desc']],
                {$set: {timestamp: updateInfo.timestamp}},
                {
                    safe: true,
                    new: true,
                    upsert: true
                }, onFinish);
        }
    };
    collection.findAndModify({topic: newArticle.topic},[['topic','desc']],
        {
            $set: {
                main_category: newArticle.main_category,
                sub_category: newArticle.sub_category,
                sub_sub_category: newArticle.sub_sub_category,
                heading: newArticle.heading,
                content: newArticle.content,
                tags: newArticle.tags,
                timestamp: newArticle.timestamp
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
    var topic = request.body.d_topic;
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
