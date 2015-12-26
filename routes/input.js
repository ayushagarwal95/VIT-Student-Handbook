'use strict';
var express = require('express');
var bcrypt = require('bcrypt-nodejs');

var router = express.Router();

var authenticate = function(req,res,next)
{
  if(req.session.isloggedin)
   next();
  else
   res.redirect('/input/login');
}

router.get('/',authenticate, function (request, response) {
    var collection = request.db.collection('articles');
    var articlesAll = collection.find({}).toArray(function(err,docs)
    {
      if(err)
       console.log(err);
       else {
         response.render('input', {message: null, results: null , listing : docs});
       }
    });
});

router.get('/register',authenticate,function(req,res,next){
   res.render('register');
});

router.post('/register',authenticate,function(req,res,next){
  var users = req.db.collection('users');
  var onInsert = function(err)
  {
   if(err)
    console.log(err)
  else
    {
      res.redirect('login');
    }
  }
  var uname = req.body.userName ;
  var pass = req.body.password ;
  console.log(pass);
  bcrypt.hash(pass,bcrypt.genSaltSync(),null,function(err,hash)
  {
   if(err)
    console.log(err);
   else
   {
     console.log('inserting');
     console.log(hash);
     users.insert({userName : uname , password : hash},onInsert);
   }
  });
});

router.post('/new',authenticate,function (request, response) {
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
            response.render('input', {message: 'Inserted', results: null , listing :null})
        }
    }
    collection.insert(article, onInsert);
});
router.get('/news',authenticate,function(req,res,next){
  res.render('news');
});

router.post('/news',authenticate,function(req,res){
       var news = req.db.collection('news')
        var newsDocument = {
           news_text : req.body.news,
           date_added : new Date()
         };
         news.insert(newsDocument,function(err){
           if (err) {
               console.log('error: ' + err);
           }
           else {
               res.render('input', {message: 'Inserted', results: null , listing :null})
           }
       });
    });

router.get('/find', function (request, response) {
    var collection = request.db.collection('articles');
    var topic = request.query.f_topic;
    console.log(topic);
    var onSearch = function (err, docs) {
        if (err) {
            console.log('error: ' + err);
        }
        else if (docs === null) {
            response.render('input', {message: 'Not Found', results: null , listing :null});
        }
        else {
            console.log(docs);
            response.render('input', {results: docs, message: 'Search Successful' , listing :null});
        }
    };
    collection.findOne({topic: topic}, onSearch);
});

router.post('/edit',authenticate, function (request, response) {
    var collection = request.db.collection('articles');
    var updateCollection = request.db.collection('updates');
    var newArticle = {
        main_category: request.body.e_m_category,
        sub_category: request.body.e_s_category,
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
                timestamp: newArticle.timestamp
            };
            var onFinish = function (err) {
                if (err) {
                    console.log('error: ' + err);
                }
            }
            updateCollection.findAndModify({topic: updateInfo.topic}, [['topic', 'desc']],
                {$set: {timestamp: updateInfo.timestamp}},
                {
                    safe: true,
                    new: true,
                    upsert: true
                }, onFinish);
        }
    };
    collection.findAndModify({topic: newArticle.topic}, [['topic', 'desc']],
        {
            $set: {
                main_category: newArticle.main_category,
                sub_category: newArticle.sub_category,
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

router.post('/delete',authenticate, function (request, response) {
    var collection = request.db.collection('articles');
    var updateCollection = request.db.collection('updates');
    var topic = request.body.d_topic;
    var onDelete = function (err, results) {
        var onUpdateRemoval = function (err, results) {
            if (err) {
                console.log('Error: ' + err);
            }
            else {
                console.log('Removed: ' + results);
            }
        };
        updateCollection.remove({topic: topic});
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

router.get('/login',function(req,res,next){
  res.render('login',{message : null });
});

router.post('/login',function(req,res,next){
   var name = req.body.userName ;
   var password = req.body.password ;
   var collection = req.db.collection('users');
   collection.findOne({userName : name},function(err,doc){
     if (err) {
         console.log('error: ' + err);
         res.status(500).send('server error');
     }
     else if(!doc)
       {
         res.render('login',{message : 'user not found'});
       }
       else if(bcrypt.compareSync(password,doc.password))
       {
         req.session.isloggedin = true ;
         res.redirect('/');
       }
       else {
          res.render('login',{message : 'incorrect password'});
       }
   })
});

router.post('/upload',authenticate, function (request, response) {
    console.log('Image uploaded: ' + request.files.name);
    response.render('input', {message: 'Uploaded', results: null});
})
module.exports = router;
