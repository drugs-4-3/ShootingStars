function Enemy(x, y, r, sx, sy) {

  this.x = x;
  this.y = y;
  this.radius = r;
  this.speedX = sx;
  this.speedY = sy;
}
Enemy.prototype.update = function() {
  this.x -= this.speedX;
  this.y += this.speedY
}
Enemy.prototype.show = function() {
  fill(255, 100, 0);
  //ellipse(this.x, this.y, this.radius*2);
  image(evil_img, this.x, this.y, this.radius*2, this.radius*2);
}
Enemy.prototype.destroy = function () {
  if (this.radius > 15) {
    enemies.push(new this.constructor(this.x, this.y, this.radius/2, this.speedX, random(-2, 2)));
    enemies.push(new this.constructor(this.x, this.y, this.radius/2, this.speedX, random(-2, 2)));
  }
}
Enemy.prototype.hits = function() {
  return dist(this.x, this.y, player.x, player.y) < (this.radius + player.radius);
}
Enemy.prototype.isOut = function() {
  return (this.x < 0 || this.y > height || this.y < 0);
}

function BigEnemy(x, y, r, sx, sy) {
  Enemy.call(this, x, y, r, sx, sy);
}
BigEnemy.prototype = Object.create(Enemy.prototype);
BigEnemy.prototype.constructor = BigEnemy;
BigEnemy.prototype.show = function() {
  image(big_enemy_img, this.x, this.y, this.radius*2, this.radius*2);
}
