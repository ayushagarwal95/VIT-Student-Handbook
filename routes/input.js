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
        topic: request.body.topic,
        content: request.body.contentText,
        tags: request.body.tag,
        timestamp: new Date()
    };
    var onInsert = function (err) {
        if (err) {
            console.log('error: ' + err);
        }
        else {
            response.status(200).send({"message": "Article Added"});
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
            response.status(404).send({results: null, message: 'Not Found'});
        }
        else {
            response.status(200).send({results: docs, message: 'Search Successful'});
        }
    };
    collection.findOne({topic: topic}, onSearch);
});

router.post('/edit', function (request, response) {
    var collection = request.db.collection('articles');
    var newArticle = {
        main_category: request.body.e_m_category,
        sub_category: request.body.e_s_category,
        topic: request.body.e_topic,
        content: request.body.e_contentText,
        tags: request.body.e_tag,
        timestamp: new Date()
    };
    var onUpdate = function (err) {
        console.log('here');
        if (err) {
            console.log('error: ' + err);
        }
        else {
            response.status(200).send({message: 'Updated', results: null});
        }
    };
    collection.findAndModify({
            query: {topic: newArticle.topic},
            update: {
                $set: {
                    main_category: newArticle.main_category,
                    sub_category: newArticle.sub_category,
                    content: newArticle.content,
                    tags: newArticle.tags,
                    timestamp: newArticle.timestamp
                }
            },
            new: true,
        }, onUpdate
    );
});

router.post('/delete', function (request, response) {
    var collection = request.db.collection('articles');
    var updateCollection = request.db.collection('updates');
    var topic = request.body.d_topic;
    var onDelete = function (err, results) {
        if (err) {
            console.log('error: ' + err);
        }
        else {
            console.log(results);
            response.status(200).send({message: 'Deleted', results: null});
        }
    };
    var query = {topic: topic};
    collection.remove(query, onDelete);
});

router.post('/upload', function (request, response) {
    console.log('Image uploaded: ' + request.files.name);
    response.status(200).send({message: 'Uploaded', results: null});
});
module.exports = router;
