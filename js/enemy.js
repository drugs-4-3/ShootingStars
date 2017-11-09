function Enemy(x, y, r, sx, sy) {

  this.x = x;
  this.y = y;
  this.radius = r;
  this.speedX = sx;
  this.speedY = sy;
  this.angle = 0;
}
Enemy.prototype.update = function() {
  this.x -= this.speedX;
  this.y += this.speedY
  this.angle += 5;
}
Enemy.prototype.show = function() {
  image(compound1, this.x, this.y, this.radius*2, this.radius*2);
}
Enemy.prototype.destroy = function () {
  if (this.radius > 15) {
    enemies.push(new this.constructor(this.x, this.y, this.radius/2, this.speedX, random(-2, 2)));
    enemies.push(new this.constructor(this.x, this.y, this.radius/2, this.speedX, random(-2, 2)));
  }
}
Enemy.prototype.hits = function() {
  return dist(this.x + this.radius, this.y + this.radius, player.x + player.radius, player.y + player.radius) < (this.radius + player.radius);
}
Enemy.prototype.isOut = function() {
  return (this.x < 0 || this.y > height || this.y < 0);
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
