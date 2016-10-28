// Setup Variables

var util = require("util");
var express = require('express');
var app = express();
var port = 8000;
var Player = require("./Player").Player; // Player.js

var db = require('mongojs').connect('localhost/mongoapp', ['users']);


var socket;
var players = [];
var items = [];

app.use(express.static(__dirname + '/public'));
var io = require('socket.io').listen(app.listen(port));


// Game event handlers
var setEventHandlers = function() {
    io.sockets.on("connection", onSocketConnection);
};

// New socket connection
function onSocketConnection(client) {
    util.log("Player connected: " + client.id);

    // Listen for client disconnected
    client.on("disconnect", onClientDisconnect);

    // Listen for new player message
    client.on("player connected", onPlayerConnect);

    // Listen for player updates
    client.on("update player", onUpdatePlayer);

    // Listen for new messages
    client.on("new message", onNewMessage);

    // Listen for logout
    client.on("logout", onLogout);

    // Player going to fight
    client.on("start fight", onStartFight);

    // Player ended fight
    client.on("abort fight", onAbortFight);
};


// Create functions
function onPlayerConnect() {

}

function onClientDisconnect() {

}
function onUpdatePlayer() {

}
function onNewMessage() {

}
function onLogout() {

}
function onStartFight() {

}
function onAbortFight() {

}
