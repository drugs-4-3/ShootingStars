var NUMBER_OF_DIFFERENT_ENEMIES = 2;

// Base class for objects that fly towards the player
function Enemy(x, y, r, sx, sy, type=null, image=null) {

    this.x = x;
    this.y = y;
    this.radius = r;
    this.speedX = sx;
    this.speedY = sy;
    this.angle = 0;

  this.type = type; // boolean indicating whether it is chemistry or biology type of Enemy.
  this.image = image;

  if (this.type === null) {
    this.type = Math.random() >= 0.5;
    if (this.type) {
      this.image = getRandomBiologyImage();
    } else {
      this.image = getRandomChemistryImage();
    }
  }
}
Enemy.prototype.update = function() {
  this.x -= this.speedX;
  this.y += this.speedY
}
Enemy.prototype.show = function() {
  image(this.image, this.x, this.y, this.radius*2, this.radius*2);
}
Enemy.prototype.destroy = function () {
  if (this.radius > 15) {
    enemies.push(new this.constructor(this.x, this.y, this.radius/2, this.speedX, random(-2, 2), this.type, this.image));
    enemies.push(new this.constructor(this.x, this.y, this.radius/2, this.speedX, random(-2, 2), this.type, this.image));
  }
}
Enemy.prototype.hits = function() {
  return dist(this.x + this.radius, this.y + this.radius, player.x + player.radius, player.y + player.radius) < (this.radius + player.radius);
}
Enemy.prototype.isOut = function() {
  return (this.x < 0 || this.y > height + this.radius || this.y < -this.radius);
}
Enemy.prototype.type = "ENEMY";


function BigEnemy(x, y, r, sx, sy) {
  Enemy.call(this, x, y, r, sx, sy);
}
BigEnemy.prototype = Object.create(Enemy.prototype);
BigEnemy.prototype.constructor = BigEnemy;
BigEnemy.prototype.show = function() {
  image(compound2, this.x, this.y, this.radius*2, this.radius*2);
}
BigEnemy.prototype.type = "BIG_ENEMY";


function Point(x, y, r, sx, sy) {
  this.x = x;
  this.y = y;
  this.radius = r;
  this.speedX = sx;
  this.speedY = sy;
}

Point.prototype.update = function() {
  this.x -= this.speedX;
  this.y -= this.speedY;
}

function getRandomBiologyImage() {
  var rand = getRandomInt(0, NUMBER_OF_DIFFERENT_ENEMIES);
  return biology_enemies_list[rand];
}

function getRandomChemistryImage() {
  var rand = getRandomInt(0, NUMBER_OF_DIFFERENT_ENEMIES);
  return chemistry_enemies_list[rand];
}

function Bonus(x, y, r, sx, sy) {
  this.x = x;
  this.y = y;
  this.radius = r;
  this.speedX = sx;
  this.speedY = sy;
}
Bonus.prototype.update = function() {
  this.x -= this.speedX;
  this.y += this.speedY;
}
Bonus.prototype.show = function() {
  image(handbook, this.x, this.y, this.radius*2, this.radius*3);
}
Bonus.prototype.hits = function() {
  return dist(this.x + this.radius, this.y + this.radius, player.x + player.radius, player.y + player.radius) < (this.radius + player.radius);
}
Bonus.prototype.isOut = function() {
  return (this.x < 0 || this.y > height || this.y < 0);
}
Bonus.prototype.getSuperPower = function() {
  return 1;
}
