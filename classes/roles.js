


var RNG = 10;

// returns a value of 1 +/- RNG % (if RNG is 10, it returns a random between 0.9 and 1.1)
function getRNG(){

}

// Returns a random integer between min (included) and max (included)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Roles(){
  this.type = {};


  this.type.fighter = {};

}

exports.Roles = Roles;

var fighter = {};
var healer = {};
var mage = {};

fighter.abilities = {};
fighter.abilities.attack(){
  return baseDamage * (getRandomInt(100-RNG, 100+RNG));
}
