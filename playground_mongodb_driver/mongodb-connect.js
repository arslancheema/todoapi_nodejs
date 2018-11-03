//var MongoClient = require('mongodb').MongoClient;
var {MongoClient} = require ('mongodb');

var dbUrl = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(dbUrl, (err, client)=>{
  if (err){
      return console.log('Unable to connect to MongoDB Server');
  }
  console.log('Connected to MongoDB server');
  var db = client.db('TodoApp');

  // db.collection('Todos').insertOne({
  //   text: 'something todo',
  //   completed: false
  // }, (error,result)=>{
  //   if(err){
  //     return console.log('Unable to insert to Todos');
  //   }
  //   console.log(result.ops);
  // });
  db.collection('Users').insertOne({
    name: 'Arslan',
    age: 28
  }, (error,result)=>{
    if(err){
      return console.log('Unable to insert to Users');
    }
    console.log(result.ops);
  });

  client.close();
})
