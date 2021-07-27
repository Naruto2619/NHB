var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://siddharth:Naruto2619*@cluster0.gqdbh.mongodb.net/mydb?retryWrites=true&w=majority";

var fs = require("fs");
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var app = new express();
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({     
  extended: true
})); 
app.use(express.static('./public'));
app.get('/',function(req,res){
    res.sendFile(path.resolve(__dirname,'./html/index.html'));
});
app.get('/nummem',function(req,res){
    res.sendFile(path.resolve(__dirname,'./numgame/numgame.html'))
})
app.post('/auth',function(req,resul){
    if(req.body.username==null){
        myobj = {"email":req.body.email,"password":req.body.password}
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("mydb");
          dbo.collection("customers").find(myobj).toArray(function(err,res){
            if(err) throw err;
            if(res.length===0){
              
            }
            db.close();
          });
        });
    }
    else{
        myobj = {"email":req.body.email,"password":req.body.password,"username":req.body.username}
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("mydb");
          dbo.collection("customers").find(myobj).toArray(function(err,res){
            if(err) throw err;
            if(res){
            }
            db.close();
          });
          dbo.collection("customers").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
          });
        });
    }
    
});

var server = app.listen(3000);
console.log("hello niga");