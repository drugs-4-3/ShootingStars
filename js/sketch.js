var player;
var enemies = [];
var bullets = [];
var bonuses = [];
var loopGame = true;
var score = 0;
var rounds = 30;
var current_biology_score = 0;
var current_chemistry_score = 0;
var biology_exams_passed = 0;
var chemistry_exams_passed = 0;
var canvas_width = 1024;
var canvas_height = 600;
var biology_enemies_list = [];
var chemistry_enemies_list = [];



function setup() {
  createCanvas(canvas_width, canvas_height);
  player = new Player();
  evil_img = loadImage('./../assets/img/evil.png');
  big_enemy_img = loadImage('./../assets/img/angel.png');
  wercia_img = loadImage('./../assets/img/Wercia.png')
  compound1 = loadImage('./../assets/img/compound1e.png');
  compound2 = loadImage('./../assets/img/compound2e.png ');
  chemistry3 = loadImage('./../assets/img/chemistry3.png ');
  biology1 = loadImage('./../assets/img/bonee.png');
  biology2 = loadImage('./../assets/img/dna1.png');
  biology3 = loadImage('./../assets/img/biology3.png');
  handbook1 = loadImage('./../assets/img/podrecznik.jpg');
  handbook2 = loadImage('./../assets/img/podrecznik2.png');
  me = loadImage('./../assets/img/me.png');

  super_power_bar_location_x = width - 150;
  super_power_bar_location_y = 70;
  super_power_bar_height = 20;
  super_power_bar_max_width = 130;

  biology_enemies_list = [biology1, biology2, biology3];
  chemistry_enemies_list = [compound1, compound2, chemistry3];
  bonuses_images = [handbook1, handbook2, me];
}

function draw() {
  if (loopGame) {
    background(0);
  } else {
    background(75, 0, 0);
  }
  if (!loopGame) {
    noLoop();
  }
  player.update();
  if (player.isOut()) {
    loopGame = false;
  }
  player.show();
  handleBullets();
  handleEnemies();
  produceEnemies();
  produceBonuses();
  handleBonuses();
  displayText();
  displaySuperPowerBar();
}

function keyPressed() {
  if (key == ' ') {
    player.shoot();
  }
  if (key == "A") {
    // do usuniecia!!!
    player.setSuperPower(getRandomInt(1, 3));
  }
  if (key == 'C') {
    player.superShoot();
  }
}

function handleBullets() {
  for (var i = 0; i < bullets.length; i++) {
    bullet = bullets[i];
    bullet.update();
    bullet.show();
    for (var j = 0; j < enemies.length; j++) {
      if (bullet.hits(enemies[j])) {
        bullets.splice(i, 1);
        upgradeExamPoints(enemies[j].type);
        enemies[j].destroy();
        enemies.splice(j, 1);
        score ++;
      }
    }
  }
}

function handleEnemies() {
  for (var i = 0; i < enemies.length; i++) {
    enemy = enemies[i];
    enemy.update();
    enemy.show();
    if (enemy.hits(player)) {
      loopGame = false;
    }
    if (enemy.isOut()) {
      enemies.splice(i, 1);
    }
  }
}

function handleBonuses() {
  for (var i = 0; i < bonuses.length; i++) {
    var bonus = bonuses[i];
    bonus.update();
    bonus.show();
    if (bonus.hits(player)) {
      player.setSuperPower(bonus.getSuperPowerCode());
      bonuses.splice(i, 1);
    }
    if (bonus.isOut()) {
      bonuses.splice(i, 1);
    }
  }
}

function produceEnemies() {
  if (frameCount % 80 == 0) {
    produceSingleEnemy();
  }
  if(frameCount % 400  == 0) {
    produceEnemiesBand();
    produceBonuses();
  }
}

function produceBonuses() {
  if (frameCount % 600 == 0) {
    produceBonus();
    console.log("producing bonus!");
  }
}

function produceBonus() {
  bonuses.push(new Bonus(width + 100, random(height), random(20,30), random(3,6), random(-0.4, 0.4)));
}

function produceSingleEnemy() {
  enemies.push(new Enemy(width + 100, random(height), random(10, 25), random(3, 6), random(-0.4, 0.4)));
}

function produceEnemiesBand() {
  var y = random(height);
  for (let i = 0; i < 8; i++) {
    enemies.push(new Enemy(width + 100, y + random(-50, 50), random(10, 25), random(3, 6), random(-0.4, 0.4)));
  }
}

function displayText() {

  // score text
  textSize(10);
  fill(255);
  text('score: ' + score.toString(), 10, 20);

  // exam scores text
  fill(0, 200, 10);
  text('Biologia: ' + current_biology_score + '%', this.width - 200, 20);
  text('Chemia: ' + current_chemistry_score + '%', this.width - 100, 20);

  // bullets text
  text('bullets: ' + rounds.toString(), 10, 40);

  // passed exams text
  fill(255, 255, 255);
  text('Zdanych arkuszy:', this.width - 300, 40);
  fill(66, 134, 244);
  textSize(15);
  text(biology_exams_passed.toString(), this.width - 200, 40);
  text(chemistry_exams_passed.toString(), this.width - 100, 40);

  // game over text
  if (!loopGame) {
    var text_size = 60;
    fill (240, 0, 10);
    textSize(text_size);
    var game_over_text = getGameOverText();
    var text_width = textWidth(game_over_text);
    text(game_over_text, width/2 - text_width/2, height/2 - text_size/2);
  }
}

function upgradeExamPoints(type) {
  if (type) {
    if (current_biology_score < 90) {
      current_biology_score += 10;
    } else {
      current_biology_score = 0;
      biology_exams_passed += 1;
      rounds += 10;
    }
  } else {
    if (current_chemistry_score < 90) {
      current_chemistry_score += 10;
    } else {
      chemistry_exams_passed += 1;
      current_chemistry_score = 0;
      rounds += 10;
    }
  }
}

function displaySuperPowerBar() {
  if (player.super_power_code !== 0) {
    switch (player.super_power_code) {
      case RADIAL_SHOOT_CODE:
        fill(0, 250, 0);
        break;
      case MULTIPLE_SHOOT_CODE:
        fill(0, 144, 144);
        break;
      default:
        break;
    }
    rect(super_power_bar_location_x, super_power_bar_location_y, Math.floor(super_power_bar_max_width*getSuperPowerBarFraction()), super_power_bar_height);
  }
}

function getSuperPowerBarFraction() {
  return 1 - ((Date.now() - player.super_power_set_time) / SUPER_POWER_TIME_LIMIT);
  //return 1 - ((Date.now() - player.super_power_set_time) / SUPER_POWER_TIME_LIMIT);
}
