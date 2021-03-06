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
var fade_set_time = 0;
var fade_color_code = 0;

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
  setBackground();
  if (!loopGame) {
    noLoop();
  }
  player.update();
  if (player.isOut()) {
    player.health_points = 0;
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
    fade_set_time = Date.now();
    fade_color_code = FADE_COLOR_RED;
  }
  if (key == 'C') {
    player.superShoot();
  }
}

function setBackground() {
  if (loopGame) {
    background(0);
    if (fade_set_time !== 0) {
      var time = Date.now() - fade_set_time;
      if (time < FADE_DURATION) {
        console.log("we;re in");
        if (time < 250) {
          var fraction = time/250;
        } else {
          var fraction = 1 - (time-250)/250;
        }
        setFadeBackground(fade_color_code, fraction);
      }
    }
  } else {
    background(75, 0, 0);
  }
}

/**
* Function takes 2 arguements:
* fade_color_code: Integer informing which color to use for fade
* fraction: Real informing at which stage of fade we're currently in. Oscilates between 0 (black) and 1 (full fade color)

To activate flash fade background at current time:
 just set fade_set_time to current time in miliseconds and set fade_color_code to preffered code.
*/
function setFadeBackground(fade_color_code, fraction) {
  switch (fade_color_code) {
    case FADE_COLOR_RED:
      background(220*fraction, 40*fraction, 10*fraction);
      break;
    case FADE_COLOR_GREEN:
      background(40*fraction, 220*fraction, 10*fraction);
      break;
    default:
      break;
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
        handleExamPoints(enemies[j].type);
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
      enemies.splice(i, 1);
      badBackgroundFade();
      if (--player.health_points <= 0) {
        loopGame = false;
      }
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
  text('Punkty: ' + score.toString(), 10, 20);

  // exam scores text
  fill(0, 200, 10);
  text('Biologia: ' + current_biology_score + '%', this.width - 200, 20);
  text('Chemia: ' + current_chemistry_score + '%', this.width - 100, 20);

  fill (203, 177, 24);
  text ("Zycie: " + player.health_points.toString(), 10, 60);

  // bullets text
  fill (200, 30, 30);
  text('Naboje: ' + rounds.toString(), 10, 40);

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

function handleExamPoints(type) {
  if (type) {
    if (current_biology_score < 90) {
      current_biology_score += 10;
    } else {
      current_biology_score = 0;
      biology_exams_passed += 1;
      rounds += 10;
      goodBackgroundFade();
    }
  } else {
    if (current_chemistry_score < 90) {
      current_chemistry_score += 10;
    } else {
      chemistry_exams_passed += 1;
      current_chemistry_score = 0;
      rounds += 10;
      goodBackgroundFade();
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
}

function badBackgroundFade() {
  fade_set_time = Date.now();
  fade_color_code = FADE_COLOR_RED;
}

function goodBackgroundFade() {
  fade_set_time = Date.now();
  fade_color_code = FADE_COLOR_GREEN;
}
