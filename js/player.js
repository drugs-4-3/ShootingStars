function Player() {

  this.radius = 30;
  this.x = 50;
  this.y = height/2;
  this.speed = 0;
  this.acceleration = 0;
  this.enable_multiple_shoot = false;
  this.enable_super_shoot = false;
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
    this.speed += this.acceleration;
    this.y += this.speed;
    // this.speed *= 0.99;
    this.acceleration = 0;
  }

  this.shoot = function() {
    if (this.super_shoot_active) {
      bullets.push(new Bullet(this.x, this.y + this.radius));
    }
    else {
      if (rounds > 0) {
        rounds--;
        bullets.push(new Bullet(this.x, this.y + this.radius));
      }
    }
  }

  this.enableSuperShoot = function () {
    var that = this;
    this.enable_super_shoot = true;
    setTimeout(function() {
      that.enable_super_shoot = false;
      that.hint_text = "";
      console.log("Super shoot disabled.")
    }, 5000);
  }

  this.superShoot = function() {
    if (this.enable_super_shoot) {
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
    }
  }

  this.setSuperPower = function(super_power_number) {
    switch (super_power_number) {
      case 1:
        this.enableSuperShoot();
      default:
        break;
    }
  }

  this.addBullets = function(how_many = 15) {
    this.rounds += how_many;
  }

  this.isOut = function() {
    return this.y < -this.radius || this.y > height + this.radius;
  }
}
