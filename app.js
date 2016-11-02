var mongojs = require("mongojs");
var db = mongojs('localhost:27017/myGame', ['account','progress']);

var express = require('express');
var app = express();
var serv = require('http').Server(app);
var Player = require('./classes/Player').Player;
//var Entity = require('./Player').Entity;

app.get('/',function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});
app.use('/client',express.static(__dirname + '/public'));

serv.listen(1338);
console.log("Server started.");

var SOCKET_LIST = {};
