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
    var parsedDate = new Date(date);
    collection.find({
        timestamp: { $gte: parsedDate }
    }, onSearch);
});

router.get('/news',function(req,res,next){
  var skip = parseInt(req.query.skip)||0;
  var coll = req.db.collection('news');
  console.log(skip);
  coll.find({}).
  sort({date_added:-1}).
  skip(skip).limit(10).toArray(function(err,docs){
    if(err)
    {
      console.log("api new fetch error");
      res.status(500).send("internal server error")
    }
    else
    {
        res.json(docs);
      }
    });
});

module.exports = router;
