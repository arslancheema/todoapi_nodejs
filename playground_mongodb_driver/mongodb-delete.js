//var MongoClient = require('mongodb').MongoClient;
var {MongoClient} = require ('mongodb');

var dbUrl = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(dbUrl, (err, client)=>{
  if (err){
      return console.log('Unable to connect to MongoDB Server');
  }
  console.log('Connected to MongoDB server');
  var db = client.db('TodoApp');

  // deleteMany
  // db.collection('Todos').deleteMany({text:"Eat Lunch"}, (err, obj)=>{
  //   if (err) throw err;
  //   console.log(obj.result.n+ " documents deleted")
  // });

  // deleteOne
  // db.collection('Todos').deleteOne({text:"Eat Lunch"}, (err, obj)=>{
  //   if (err) throw err;
  //   console.log(obj.result.n+ " document deleted")
  // });

  // findOneAndDelete
  db.collection('Todos').findOneAndDelete({completed:true}, (err, result)=>{
    if (err) throw err;
    console.log(result);
  });
  //client.close();
})
