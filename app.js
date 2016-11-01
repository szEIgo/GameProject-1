var util = require("util");
var	express = require('express');
var	app = express();
var	port = 8000;
var	Player = require("./Player").Player; // Player class
var	Map = require("./Map").Map; // Map Class
//var	Item = require("./Item").Item;
var	db = require('mongojs')('localhost/mongoapp', ['users']);
var	socket;	// socket controller
var	players = []; // connected players
var	world; // map to draw
var	collisionMap = [];
var	worldSize;
var	tileSize;

app.use(express.static(__dirname + '/public'));
var io = require('socket.io').listen(app.listen(port));

function init() {
	// Initialize the world

};

// GAME EVENT HANDLERS
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

function onPlayerConnect(data) {
	var toClient = this;
	if(!data.name) {
		toClient.emit("no player");
	}
	db.users.findOne( { name: data.name }, function(err, savedUser) {
		if(err || !savedUser) {
			toClient.emit("no player");

			var player = new Player(128, 192, data.name, 100);
			db.users.save(player, function(err2, savedUser2) {
				if(err2 || !savedUser2) {
					// Error occurred
				}
				else {
					// User saved
				}
			});
		}
		else {
			toClient.emit("validated");
			joinPlayer(toClient, data.name);
		}
	});
};

function joinPlayer(client, name) {
	// Send world-data to client
	client.emit("init map", {world: world, tileSize: tileSize, worldSize: worldSize});

	client.emit("init collisionMap", collisionMap);

	var player = playerByName(name);

	// New Localplayer
	if(!player) {
		for (var i = 0; i < players.length; i++) {
			client.emit("update player", players[i]);
		};

		// Create a new player
		// x, y, name, 100, id
		player = new Player(320, 128, name, 100, client.id);

		// Add new player to the players array
		players.push(player);

		// Broadcast new player to connected socket clients
		client.broadcast.emit("update player", player);
		client.broadcast.emit("new message", {player: name, text: "joined the game", mode: "s"});
	}
	// Existing Localplayer
	else {
		// Update the old ID
		var oldID = player.id;

		for (var j = 0; j < players.length; j++) {
			if (players[j].id == oldID) {
				players[j].id = client.id;
			}
			else {
				client.broadcast.emit("update player", players[j]);
			}
		};
	}
	client.emit("create localplayer", player);
};

function onStartFight(data) {
	var player = playerById(data.id);

	if(player) {
		player.setGoFight(data.enemyID);
	}
};

function onAbortFight(data) {
	var player = playerById(data.id);

	if(player) {
		player.stopFight();
	}
}

var calculateDamage = function(att, def) {
	// Math.random() * (max - min + 1) + min;
	var damage = Math.floor((Math.random()*((att - def) - (att - def - 8))) + (att - def - 8));
	if(damage < 0) damage = 0;
	return damage;
}

var fightLoop = setInterval(function() {
}, 16);

function onLogout(data) {
	var player = playerById(this.id);

	if(!player) {
		return;
	}

	this.broadcast.emit("new message", {player: player.name, text: "left the game", mode: "s"});
	players.splice(this.id, 1);
	this.broadcast.emit("remove player", {id: this.id});
};

// Socket client has disconnected
function onClientDisconnect(data) {
	util.log("disconnect: " + this.id);
	//this.emit("disconnect");
};

function onUpdatePlayer(data) {
	var player = playerById(this.id);

	// Player not found
	if (!player) {
		return;
	};

	// Update player position
	player.pos.x = data.x;
	player.pos.y = data.y;
	player.dir = data.dir;

	// Broadcast updated position to connected socket clients
	this.broadcast.emit("update player", player);

}

function onNewMessage(data) {
	var player = playerById(this.id);
	if (data.chatTo) {
		var chatTo = playerByName(data.chatTo);
		if (data.mode == "w" && chatTo) {
			io.to(chatTo.id).emit("new message", {player: player.name, text: data.text, mode: data.mode});
		}
		else if (!chatTo) {
			this.emit("new message", {player: data.chatTo, text: "Player " + data.chatTo + " doesn't exist!", mode: "s"});
		}
	}
	else {
		io.sockets.emit("new message", {player: player.name, text: data.text, mode: data.mode});
	}
}


// Helper
function playerById(id) {
	for (var i = 0; i < players.length; i++) {
		if (players[i].id == id) {
			return players[i];
		}
	}

	return false;
}

function playerByName(name) {
	for (var j = 0; j < players.length; j++) {
		if (players[j].name == name) {
			return players[j];
		}
	};
	return false;
};

// Run the game
init();