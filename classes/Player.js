function Player(startX, startY, health, role, id){
  // set players starting position
  this.x = startX;
  this.y = startY;
  // set player role (includes abilities and modifiers)
  this.role = role;

  // set players health based on role
  this.baseHealth = 100;
  this.maxHealth = this.baseHealth * role.healthModifier;
  this.health = this.maxHealth;


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
}

  this.move(x,y){
    this.x = x;
    this.y = y;
  }
}

exports.Player = Player;
