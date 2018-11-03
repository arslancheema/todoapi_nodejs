//var MongoClient = require('mongodb').MongoClient;
var {MongoClient} = require ('mongodb');

var dbUrl = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(dbUrl, (err, client)=>{
  if (err){
      return console.log('Unable to connect to MongoDB Server');
  }
  console.log('Connected to MongoDB server');
  var db = client.db('TodoApp');

  // db.collection('Todos').find({}).toArray(function(err, result) {
  //   if (err) throw err;
  //   console.log(result);
  //
  // });

  var query = {completed:false};
  db.collection('Todos').find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);

  });

  //client.close();
})
