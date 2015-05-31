'use strict';
var express = require('express');

var router = express.Router();

router.get('/', function (request, response) {
	response.render('input');
});

router.post('/new', function (request, response) {
	var article = {
		main_category: request.body.m_category,
		sub_category: request.body.s_category,
		topic: request.body.topic,
		heading: request.body.heading,
		content: request.body.content,
		tags: request.body.tags		
	};
	var collection = request.db.collection('articles');
	collection.insertOne(article);
});

module.exports = router;