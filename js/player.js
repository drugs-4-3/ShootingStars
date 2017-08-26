var score = 0;
var rounds = 30;


function Player() {

  this.radius = 15;
  this.x = 50;
  this.y = height/2;
  this.speed = 0;
  this.acceleration = 0;

  this.show = function() {
    fill(255, 120, 160);
    ellipse(this.x, this.y, this.radius*2);
  }

  this.moveUp = function() {
    this.acceleration = -1;
  }
  this.moveDown = function() {
    this.acceleration = 1;
  }

  this.update = function() {
    if (keyIsDown(DOWN_ARROW) || keyIsDown(LEFT_ARROW)) {
      player.moveDown();
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(RIGHT_ARROW)) {
      player.moveUp();
    }
    // if (keyIsDown(32)) {
    //   player.shoot();
    // }
    this.speed += this.acceleration;
    this.y += this.speed;
    // this.speed *= 0.99;
    this.acceleration = 0;
  }

  this.shoot = function() {
    if (rounds > 0) {
      rounds--;
      bullets.push(new Bullet(this.x, this.y));
    }
  }
}
