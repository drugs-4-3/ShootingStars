function Player() {

  this.radius = 30;
  this.x = 50;
  this.y = height/2;
  this.speed = 0;
  this.acceleration = 0;
  this.super_power_code = 0;
  this.health_points = 3;
  var that = this;


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
    // C on a keyboard
    if (keyIsDown(67)) {
      if (this.super_power_code === MULTIPLE_SHOOT_CODE) {
        bullets.push(new Bullet(this.x, this.y + this.radius));
      }
    }
    this.speed += this.acceleration;
    this.y += this.speed;
    // this.speed *= 0.99;
    this.acceleration = 0;

    if (this.super_power_code !== 0) {
      var curr_time = Date.now();
      if (Date.now() - this.super_power_set_time > SUPER_POWER_TIME_LIMIT) {
        this.super_power_code = NO_POWER_CODE;
      }
    }
  }

  this.shoot = function() {
    if (this.super_power_code === MULTIPLE_SHOOT_CODE) {
      bullets.push(new Bullet(this.x, this.y + this.radius));
    }
    else {
      if (rounds > 0) {
        rounds--;
        bullets.push(new Bullet(this.x, this.y + this.radius));
      }
    }
  }

  this.superShoot = function() {
    if (this.super_power_code !== 0) {
      // left place for other options and ideas
      switch (this.super_power_code) {
        case RADIAL_SHOOT_CODE:
          bullets.push(new Bullet(this.x, this.y + this.radius, null, 15, SPECIAL_BULLET_COLOR_R, SPECIAL_BULLET_COLOR_G, SPECIAL_BULLET_COLOR_B));
          bullets.push(new Bullet(this.x, this.y + this.radius, null, 10, SPECIAL_BULLET_COLOR_R, SPECIAL_BULLET_COLOR_G, SPECIAL_BULLET_COLOR_B));
          bullets.push(new Bullet(this.x, this.y + this.radius, null, 5, SPECIAL_BULLET_COLOR_R, SPECIAL_BULLET_COLOR_G, SPECIAL_BULLET_COLOR_B));
          bullets.push(new Bullet(this.x, this.y + this.radius, null, 0, SPECIAL_BULLET_COLOR_R, SPECIAL_BULLET_COLOR_G, SPECIAL_BULLET_COLOR_B));
          bullets.push(new Bullet(this.x, this.y + this.radius, null, -5, SPECIAL_BULLET_COLOR_R, SPECIAL_BULLET_COLOR_G, SPECIAL_BULLET_COLOR_B));
          bullets.push(new Bullet(this.x, this.y + this.radius, null, -10, SPECIAL_BULLET_COLOR_R, SPECIAL_BULLET_COLOR_G, SPECIAL_BULLET_COLOR_B));
          bullets.push(new Bullet(this.x, this.y + this.radius, null, -15, SPECIAL_BULLET_COLOR_R, SPECIAL_BULLET_COLOR_G, SPECIAL_BULLET_COLOR_B));
          break;
        default:
          break;
      }
    }
  }

  this.setSuperPower = function(super_power_number) {
    this.super_power_code = super_power_number;
    this.super_power_set_time = Date.now();
  }

  this.addBullets = function(how_many = 15) {
    this.rounds += how_many;
  }

  this.isOut = function() {
    return this.y < -this.radius || this.y > height + this.radius;
  }
}
