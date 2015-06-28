'use strict';

var express = require('express');
var router = express.Router();

router.post('/updates', function (request, response) {
    var collection = request.db.collection('articles');
    var onSearch = function (err, docs) {
        if (err) {
            console.log('Internal Server Error: ' + err);
            response.status(500).send('Internal Server Error');
        }
        else {
            console.log(docs);
            response.json(docs);
        }
    };
    var date = request.body.timestamp;
    var parsedDate = new Date(date).toISOString();
    console.log(parsedDate);
    var query = {};
    query['timestamp'] = {
            '$gte': {
                '$date': parsedDate
                }
    };
    collection.find(query).toArray(onSearch);
});

module.exports = router;
