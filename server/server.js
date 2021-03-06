var express = require('express');
var bodyParser = require('body-parser');
var dbHelpers = require('../db/dbhelper.js');
var path = require('path')
var app = express();

var rootPath = path.normalize(__dirname + '/../client');
// app.use(express.static(__dirname + "/client"));
app.use("/node_modules",express.static(__dirname + "/../node_modules"));
app.use("/styles", express.static(__dirname + "/../styles"));
app.use("/compiled", express.static(__dirname + "/../compiled"));
app.use("/server", express.static(__dirname + "/../server"));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(process.env.PORT || 3000, function(){
  console.log('Server is running');
});

app.get('/', function(req, res) {
  res.sendFile(path.join(rootPath + "/index.html"));
})

app.get('/fuckDan', function(req, res){
  console.log('request received at /fuckDan');
  res.send(JSON.stringify({"message": "Fuck Dan"}));
});

app.post('/api/script/add', function(req, res) {
	var newScript = req.body; 
	dbHelpers.addScript(newScript, res); 
}); 

app.post('/api/script/find', function(req, res) {
	var findScript = req.body; 
	dbHelpers.getScripts( findScript, res); 
}); 

app.post('/api/doctor/add', function(req, res) {
  var newDoc = req.body; 
  dbHelpers.addDoc(newDoc, res); 
}); 

app.get('/api/doctor/find', function(req, res) {
  var targetDocs = req.body; 
  dbHelpers.getDocs(targetDocs, res); 
}); 