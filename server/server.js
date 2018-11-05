var express = require ('express');

// Parse incoming request bodies
var bodyParser = require ('body-parser');

// For using in PATCH / UPDATE route
var _ = require('lodash');

var {mongoose} = require ('./db/mongoose.js')
var {Todo} = require('./models/Todo.js');
var {User} = require('./models/User.js');
var {ObjectID} = require ('mongodb');

var app = express();
var port = process.env.PORT || 3005;

// through this we can send JSON to Express application
app.use(bodyParser.json());

//  POST /todos
app.post('/todos', (req,res)=>{
    var todo = new Todo({
      text: req.body.text,
    });
    todo.save((err,doc)=>{
      if (err) {
        res.send(err);
      } else {
      res.send(doc);
      }

    });
});

//  GET /todos
app.get('/todos', (req,res)=>{
  Todo.find({}, function (err, docs) {
    if (err) {
    res.status(400).send(err);
    }
    res.send({docs});
  });
});

//  GET /todos/:id
app.get('/todos/:id',(req,res)=>{
  var id = req.params.id;

  if (!ObjectID.isValid(id)){
  return res.status(404).send();
  }

  Todo.findById ({
    _id: id
    }, (err, doc)=>{
    if(!doc){
     console.log('ID not found');
      res.send('ID not found');
      return;
    }
    console.log('Todos by findById: ', doc);
    res.status(200).send(doc);
  });
});

// DELETE /todos/:id
app.delete('/todos/:id', (req,res)=> {
    var id = req.params.id;
    if (!ObjectID.isValid(id)){
    return res.status(404).send();
    }
    Todo.findByIdAndRemove(id,(err,doc)=>{
      if (err){
        console.log(err);
        res.status(400).send();
        return ;
      }
      if(!doc){
       console.log('ID not found');
        res.send('ID not found');
        return;
      }
      console.log(doc);
      res.status(200).send(doc);
    });
});

app.patch('/todos/:id', (req,res)=>{
  var id = req.params.id;
  // we only want these properties to get updated
  var body = _.pick(req.body, ['text','completed']);

  if (!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false ;
    body.completedAt = null
  }

  Todo.findByIdAndUpdate(id, {$set: body} , {new:true}, (err,doc)=>{
    if (err){
      return res.status(400).send();
    }
    if (!doc){
      return res.status(404).send();
    }
    res.send({todo: doc});
  });

});

app.listen(port, ()=>{
  console.log('Starting at port ' + port );
});

module.exports = {
  app: app
}
