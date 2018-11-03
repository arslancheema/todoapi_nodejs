var {mongoose} = require('./../server/db/mongoose');
var {Todo} = require ('./../server/models/Todo');
var {ObjectID} = require ('mongodb');

var id = '5bd972cfa6a8968f52a23c2c';

if (!ObjectID.isValid(id)){
  console.log('ID not valid')
}

Todo.find ({
  // no need to manually convert to Object ID
  _id: id
}, (err, docs)=>{
  if(!docs){
    return console.log('ID not found');
  }
  console.log('Todos by find: ', docs);
});

// First one will be returned
Todo.findOne ({
  _id: id
}, (err, doc)=>{
  if(!doc){
    return console.log('ID not found');
  }
  console.log('Todos by findOne: ', doc);
});

Todo.findById ({
  _id: id
}, (err, doc)=>{
  if(!doc){
    return console.log('ID not found');
  }
  console.log('Todos by findById: ', doc);
});
