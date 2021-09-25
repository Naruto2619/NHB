var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://siddharth:Naruto2619*@cluster0.gqdbh.mongodb.net/mydb?retryWrites=true&w=majority";
var fs = require("fs");
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = new express();
const cors = require("cors")
var server = require('http').createServer(app);
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({     
  extended: true
})); 
app.use(express.static('./public'));
app.use(cors())
app.get('/',function(req,res){
    res.sendFile(path.resolve(__dirname,'./html/index.html'));
});
app.get('/nummem',function(req,res){
    res.sendFile(path.resolve(__dirname,'./numgame/numgame.html'))
})
app.get('/typing',function(req,res){
  res.sendFile(path.resolve(__dirname,'./html/typing.html'))
})
app.get('/homepage',function(req,res){
  res.sendFile(path.resolve(__dirname,'./html/homepage.html'))
});
app.post('/auth',function(req,resul){
    if(req.body.username==null){
        myobj = {"email":req.body.email,"password":req.body.password}
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("mydb");
          dbo.collection("customers").find(myobj).toArray(function(err,res){
            if(err) throw err;
            if(res.length===0){
              resul.sendFile(path.resolve(__dirname,'./html/index.html'));
            }
            else{
              resul.redirect("/homepage");
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
          dbo.collection("customers").find({"email":myobj["email"]}).toArray().then(items=>{
            if(items.length>0){
              console.log("user already exists"); 
            }
            else{
              console.log("ok");
              dbo.collection("customers").insertOne(myobj).then( items => {
                console.log(items);
              }).then(items=>{db.close();})
                console.log("1 document inserted");
              resul.redirect("/homepage");
            }
          });
        });
    }
});

var server = app.listen(3000);
console.log("hello niga");