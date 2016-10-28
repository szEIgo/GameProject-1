function Player(startX, startY, name, hp, id) {
    this.pos = {x: startX, y: startY};
    this.alive = true;
    this.maxhp = 1000; // Specified by Race later
    this.money = 0; // Use money to buy upgrades
    this.currhp = hp;
    this.name = name;
    this.goFight = null; // Engage battle
    this.fighting = null; // Already battling +
    this.strength = 50; // Specified by Race later
    this.lastStrike = 0; // Randomized percentage value to be added
    this.hitSpeed = 500; // Specified by Race / Upgrade later
    this.id = id;

    this.getLastStrike = function() {
        return this.lastStrike;
    };

    this.getCurrHP = function() {
        return this.currhp;
    };

    this.getHurt = function(amount) {
        this.currhp -= amount;
        if(this.currhp < 0) {
            this.currhp = 0;
            this.alive = false;
        }
    };

    this.setLastStrike = function(time) {
        this.lastStrike = time;
    };

    this.setGoFight = function(value) {
        this.goFight = value;
        if(value == null) {
            this.fighting = null;
        }
    };

    this.stopFight = function() {
        this.goFight = null;
        this.fighting = null;
    };

    this.inFight = function(enemyID) {
        this.fighting = enemyID;
    };

    this.readyToHit = function() {
        return (this.fighting != null && (Date.now() - this.lastStrike > this.hitSpeed));
    };

    this.takeItem = function(type, change) {
        if(type == 0) {
            this.currhp += change;
        }
        else if(type == 1) {
            this.money += change;
        }
    };
}

// Export the Player class so you can use it in
// other files by using require("Player").Player
exports.Player = Player;