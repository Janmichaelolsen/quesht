(function() {

  'use strict';
  var express = require('express');
  var router = express.Router();
  var mongojs = require('mongojs');
  var shortid = require('shortid');
  var db = mongojs('mongodb://jamma:h3e3l9i77@ds037252.mongolab.com:37252/heroku_p342lcj1', ['questions', 'answers']);

  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index');
  });

  router.post('/api/answers', function(req, res) {
    db.answers.insert(req.body, function(err, data) {
      res.json(data);
    });
  });

  router.post('/api/questions', function(req, res) {
    db.questions.insert({_id: shortid.generate(),
                        question: req.body.question}, function(err, data) {
      res.json(data);
    });
  });

  router.post('/api/questionGet', function(req, res) {
    var quest_id = req.body.q_id;
    if(req.body.q_id != null){
      db.questions.findOne(
        { _id: quest_id },function(err, questionData) {
          if(err){
            res.json(null);
          }else{
            db.answers.find({ question: quest_id.toString()}, function(err, answerData) {
              res.json({"question": questionData,
                        "answers": answerData});
            });
          }
      });
    }else {
      res.json(null);
    }
  });

  router.post('/api/todos', function(req, res) {
    db.todos.insert(req.body, function(err, data) {
      res.json(data);
    });

  });

  router.put('/api/todos', function(req, res) {

    db.todos.update({
      _id: mongojs.ObjectId(req.body._id)
    }, {
      isCompleted: req.body.isCompleted,
      todo: req.body.todo
    }, {}, function(err, data) {
      res.json(data);
    });

  });

  router.delete('/api/answers/:_id', function(req, res) {
    db.answers.remove({
      _id: mongojs.ObjectId(req.params._id)
    }, '', function(err, data) {
      res.json(data);
    });

  });

  module.exports = router;

}());
