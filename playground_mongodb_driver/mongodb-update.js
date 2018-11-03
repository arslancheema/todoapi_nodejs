//var MongoClient = require('mongodb').MongoClient;
var {MongoClient, ObjectID} = require ('mongodb');

var dbUrl = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(dbUrl, (err, client)=>{
  if (err){
      return console.log('Unable to connect to MongoDB Server');
  }
  console.log('Connected to MongoDB server');
  var db = client.db('TodoApp');

  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('5bcc7de3629c897b121c4f80')
  },{
    $set: {
      completed:false
    }
  }, {
    returnOriginal: false
  }, (err,result)=>{
    if (err) throw err;
    console.log('findOneAndUpdate : ');
    console.log(result);
  });



  //client.close();
})
