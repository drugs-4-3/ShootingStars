function Enemy(x, y, r, sx, sy) {

  this.x = x;
  this.y = y;
  this.radius = r;
  this.speedX = sx;
  this.speedY = sy;

  this.update = function () {
    this.x -= this.speedX;
    this.y += this.speedY
  }

  this.show = function() {
    fill(255, 100, 0);
    ellipse(this.x, this.y, this.radius*2);
  }

  this.destroy = function() {
    if (this.radius > 15) {
      enemies.push(new Enemy(this.x, this.y, this.radius/2, this.speedX, random(-2, 2)));
      enemies.push(new Enemy(this.x, this.y, this.radius/2, this.speedX, random(-2, 2)));
    }
  }

  this.hits = function(player) {
    return dist(this.x, this.y, player.x, player.y) < (this.radius + player.radius);
  }

  this.isOut = function() {
    return (this.x < 0 || this.y > height || this.y < 0);
  }
}
