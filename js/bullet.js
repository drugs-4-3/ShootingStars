function Bullet(x, y) {

  this.radius = 2.5;
  this.speed = 18;

  this.x = x;
  this.y = y;

  this.update = function () {
    this.x += this.speed;
  }

  this.show = function() {
    fill(0, 255, 80);
    ellipse(this.x, this.y, this.radius*2);
  }

  this.hits = function(enemy) {
    return dist(this.x, this.y, enemy.x, enemy.y) < (enemy.radius + this.radius);
  }
}
