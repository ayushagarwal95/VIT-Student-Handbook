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

router.post('/search', function (request, response) {
    var searchText = request.body.searchItem;
    //TODO - mongo search on tags
    
});
module.exports = router;
