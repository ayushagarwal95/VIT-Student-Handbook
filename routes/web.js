'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function (request, response) {
    response.render('index');
});

router.post('/login', function (request, response) {
    var regno = request.body.reg_num;
    // TODO - Add suggestions functionality
    response.render('main');
});

router.get('/main', function (request, response) {
    response.render('main');
});

router.get('/search', function (request, response) {
    var searchText = request.query.tag;
    var collection = request.db.collection('articles') ;
    var query = {} ;
    query['tags'] = {'$regex' : '*.;'+searchText+';.*'};
    collection.find(query).toArray(function(err,docs){
      if(err)
      {
        response.status(500).send('internal server error');
      }
       else {
         response.json(docs);
       }
    });

});
module.exports = router;
