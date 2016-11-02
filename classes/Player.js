function Player(startX, startY, health, role, id){
  // set players starting position

  this.x = startX;
  this.y = startY;
  // set player role (includes abilities and modifiers)
  this.role = role;
  this.lastAttack = 0;
  this.RNG = 10;
  this.attackSpeed = role.getAttackSpeed() * 1000;
  // set players health based on role
  this.baseHealth = 100;
  this.maxHealth = this.baseHealth * role.healthModifier;
  this.health = this.maxHealth;

  this.addRNG(baseDamage){
    var multiplier = (Math.Random() * 90 + 110)/100;
    return baseDamage * multiplier;
  }

this.attack(){
  // if player is ready to attack, then do
  // if not, then send feedback
  if (lastAttack + attackFrequency > Date.now()){
    // returns object with info on the amount and type of the damage dealt
    return {
      damageAmount: this.role.damageAmount * this.addRNG(),
      damageType: this.role.damageType
    }
  }
  else{
    // what happens if the player can't attack now, goes here:
    // some sort of feedback should be performed
    console.log('you\'re fast, but not Chuck Norris');

  }

}

// let the player take some damage
this.damage(amount, type){
  if(!type){
    this.health -= amount;
  }
  else{
    this.health -= amount * this.role.modifier[type];
  }
}

// let the player be healed
this.heal(amount){
  this.health += amount;
  if (this.health > this.maxHealth){
    this.health = this.maxHealth;
  }
}

  this.move(x,y){

    /*

    future: if there's a path, then create it, else return some error..

    but for now...
    */
    this.x = x;
    this.y = y;
  }
}

exports.Player = Player;
