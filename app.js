// pacakges and dependencies
//
//
//
//
var MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
var url = process.env.API_KEY;
var fs = require("fs");
var express = require('express');
const sessions = require('express-session');
const cookieParser = require("cookie-parser");
var path = require('path');
var bodyParser = require('body-parser');
var app = new express();
const cors = require("cors")
var server = require('http').createServer(app);
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
  secret: "secretgei",
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false
}));
var isUserLog = false;
app.use(cookieParser());
var session;
app.use( express.json() );       
app.use(express.urlencoded({     
  extended: true
})); 
app.use(express.static('./public'));
app.use(cors())


// handling and serving pages
//
//
//
app.get('/',function(req,res){
    session = req.session;
    if(session.userid){
      res.redirect("/homepage");
    }
    else{
    res.sendFile(path.resolve(__dirname,'./html/index.html'));
    }
});
app.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect('/');
  isUserLog = false;
});
app.get('/nummem',function(req,res){
  if(isUserLog){
    res.sendFile(path.resolve(__dirname,'./html/numgame.html'))
  }
  else{
    res.redirect('/')
  } 
})
app.get('/typing',function(req,res){
  if(isUserLog){
    res.sendFile(path.resolve(__dirname,'./html/typing.html'))
  }
  else{
    res.redirect('/')
  } 
})
app.get('/rgb',function(req,res){
  if(isUserLog){
    res.sendFile(path.resolve(__dirname,'./html/colorgameproj.html'))
  }
  else{
    res.redirect('/')
  } 
})
// score api
//
//
app.post("/*score", (req, res) => {
  let typ = req.body.game.toString();
  console.log(typ)
  if(typ === "typing"){
    var updateDocument = {
      $set: { "typing" : req.body.score }
    }
  }
  else if(typ === "rgb"){
    var updateDocument = {
      $set: { "rgb" : req.body.score }
    }
  }
  else{
    var updateDocument = {
      $set: { "numgame" : req.body.score }
    }
  }
  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("NHB").updateOne({"username" : session.userid},updateDocument);
  });
  console.log(req.body.score)
})
//
//
//
app.get('/homepage',function(req,res){
  if(isUserLog){
    res.sendFile(path.resolve(__dirname,'./html/homepage.html'))
  }
  else{
    res.redirect('/')
  }
});
app.post('/auth',function(req,resul){
    if(req.body.username==null){
        myobj = {"email":req.body.email,"password":req.body.password}
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("mydb");
          dbo.collection("NHB").find(myobj).toArray(function(err,res){
            if(err) throw err;
            if(res.length===0){
              resul.sendFile(path.resolve(__dirname,'./html/index.html'));
            }
            else{
              session = req.session;
              session.userid = res[0].username;
              isUserLog = true;
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
          dbo.collection("NHB").find({"email":myobj["email"]}).toArray().then(items=>{
            if(items.length>0){
              console.log("user already exists"); 
            }
            else{
              console.log("ok");
              dbo.collection("NHB").insertOne(myobj).then( items => {
                console.log(items);
              }).then(items=>{db.close();})
              session = req.session;
              session.userid = req.body.username;
              isUserLog = true;
                console.log("1 document inserted");
              resul.redirect("/homepage");
            }
          });
        });
    }
});
var server = app.listen(3000);
console.log("hello niga");