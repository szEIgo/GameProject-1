var mongojs = require("mongojs");
var db = mongojs('localhost:27017/myGame', ['account','progress']);

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var world = require('./classes/server');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/js/world.js', function(req, res){
    res.sendFile(__dirname + '/public/js/world.js');
});

io.on('connection', function(socket){
    console.log('a user connected');

    var id = socket.id;
    world.addPlayer(id);

    var player = world.playerForId(id);
    socket.emit('createPlayer', player);

    socket.broadcast.emit('addOtherPlayer', player);

    socket.on('requestOldPlayers', function(){
        for (var i = 0; i < world.players.length; i++){
            if (world.players[i].playerId != id)
                socket.emit('addOtherPlayer', world.players[i]);
        }
    });
    socket.on('updatePosition', function(data){
        var newData = world.updatePlayerData(data);
        socket.broadcast.emit('updatePosition', newData);
    });
    socket.on('disconnect', function(){
        console.log('user disconnected');
        io.emit('removeOtherPlayer', player);
        world.removePlayer( player );
    });

});

var port = 1338;
var ip_address = '127.0.0.1';

http.listen(port, ip_address, function(){
    console.log( "Listening on " + ip_address + ", server_port " + port );
});
