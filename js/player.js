function Player() {

  this.radius = 30;
  this.x = 50;
  this.y = height/2;
  this.speed = 0;
  this.acceleration = 0;
  this.super_shoot_active = false;

  this.show = function() {
    //fill(255, 120, 160);
    //ellipse(this.x, this.y, this.radius*2);
    image(wercia_img, this.x, this.y, this.radius*2, this.radius*2);
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
    if (player.super_shoot_active && keyIsDown(32)) {
      console.log('space is down');
      bullets.push(new Bullet(player.x, player.y));
    }
    this.speed += this.acceleration;
    this.y += this.speed;
    // this.speed *= 0.99;
    this.acceleration = 0;
  }

  this.shoot = function() {
    if (this.super_shoot_active) {
      bullets.push(new Bullet(this.x, this.y));
    }
    else {
      if (rounds > 0) {
        rounds--;
        bullets.push(new Bullet(this.x, this.y + this.radius));
      }
    }
  }

  this.superShoot = function() {
    var color_r = 109;
    var color_g = 0;
    var color_b = 0;
      bullets.push(new Bullet(this.x, this.y + this.radius, null, 15, color_r, color_g, color_b));
      bullets.push(new Bullet(this.x, this.y + this.radius, null, 10, color_r, color_g, color_b));
      bullets.push(new Bullet(this.x, this.y + this.radius, null, 5, color_r, color_g, color_b));
      bullets.push(new Bullet(this.x, this.y + this.radius, null, 0, color_r, color_g, color_b));
      bullets.push(new Bullet(this.x, this.y + this.radius, null, -5, color_r, color_g, color_b));
      bullets.push(new Bullet(this.x, this.y + this.radius, null, -10, color_r, color_g, color_b));
      bullets.push(new Bullet(this.x, this.y + this.radius, null, -15, color_r, color_g, color_b));
      console.log(bullets);
  }
}
