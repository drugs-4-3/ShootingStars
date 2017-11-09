

function Bullet(x, y, speed_x = 18, speed_y = 0, color_r = 0, color_g = 255, color_b = 80) {

  this.radius = 2.5;
  this.speed_x = 18;
  this.speed_y = speed_y;

  this.color_r = color_r;
  this.color_g = color_g;
  this.color_b = color_b;

  this.x = x;
  this.y = y;

  this.update = function () {
    this.x += this.speed_x;
    this.y += this.speed_y;
  }

  this.show = function() {
    fill(this.color_r, this.color_g, this.color_b);
    ellipse(this.x, this.y, this.radius*2);
  }

  this.hits = function(enemy) {
    return dist(this.x + this.radius, this.y + this.radius, enemy.x + enemy.radius, enemy.y + enemy.radius) < (enemy.radius + this.radius);
  }
}
