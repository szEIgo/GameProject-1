function Player(startX, startY, health, role, id){
  // set players starting position

  this.x = startX;
  this.y = startY;
  // set player role (includes abilities and modifiers)
  this.role = role;
  this.lastAttack = 0;
  this.RNG = 10;
  this.attackFrequency = 1500;
  // set players health based on role
  this.baseHealth = 100;
  this.maxHealth = this.baseHealth * role.healthModifier;
  this.health = this.maxHealth;

  this.addRNG(base){
    var multiplier = (Math.Random() * 9 + 11)/10;
    return base * multiplier;
  }

this.attack(other){
  if (lastAttack + attackFrequency > Date.now()){
    other.damage(this.role.getDamageAmount(), this.role.getDamageType());
  }
  else{
    console.log('you\'re fast, but not Chuck Norris');
    // do nothing
    // or send feedback in chat or on HUD?
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
