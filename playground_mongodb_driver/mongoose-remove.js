var {mongoose} = require('./../server/db/mongoose');
var {Todo} = require ('./../server/models/Todo');
var {ObjectID} = require ('mongodb');


// .remove({})
// Todo.remove({},(err,result)=>{
//   console.log(result);
// })

// .findOneAndDelete
// .findByIdAndRemove



Todo.findByIdAndRemove(
  '5bde6abec3bbf278cb939540'
,(err,doc)=>{
  console.log(doc);
});

// Similar
Todo.findOneAndDelete({_id:'5bde6abec3bbf278cb939540'}
,(err,doc)=>{
  console.log(doc);
});
