var roles = {};

roles.fighter = function(){
  this.damageAmount = 20;
  this.damageType = 'physical';
  this.healthModifier = 1.2;
  this.attackSpeed = 1.8;

  this.getDamageAmount(){
    return this.damageAmount;
  }
  this.getDamageType(){
    return this.damageType;
  }
  this.getHealthModifier(){
    return this.healthModifier;
  }

  this.getAttackSpeed(){
    return this.attackSpeed;
  }

}
roles.mage(){
  this.damageAmount = 20;
  this.damageType = 'magical';
  this.healthModifier = 0.8;


  this.getDamageAmount(){
    return this.damageAmount;
  }
  this.getDamageType(){
    return this.damageType;
  }
  this.getHealthModifier(){
    return this.healthModifier;
  }
}

roles.priest(){
  this.damageAmount = 20;
  this.damageType = 'magical';
  this.healthModifier = 1;


  this.getDamageAmount(){
    return this.damageAmount;
  }
  this.getDamageType(){
    return this.damageType;
  }
  this.getHealthModifier(){
    return this.healthModifier;
  }
}



module.exports = Role;
