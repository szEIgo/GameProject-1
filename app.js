// Setup Variables

var util = require("util");
var express = require('express');
var app = express();
var port = 8000;
var Player = require("./Player").Player; // Player.js
var socket;
var players = [];



