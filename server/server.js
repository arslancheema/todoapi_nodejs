var express = require ('express');

// Parse incoming request bodies
var bodyParser = require ('body-parser');

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
  console.log('ID not valid');
  res.status(404).send("Id is not valid")
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
})

app.listen(port, ()=>{
  console.log('Starting at port ' + port );
});

module.exports = {
  app: app
}
