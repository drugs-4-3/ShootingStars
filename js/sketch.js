var player;
var enemies = [];
var bullets = [];
var loopGame = true;
var score = 0;
var rounds = 30;
var current_biology_score = 0;
var current_chemistry_score = 0;
var biology_exams_passed = 0;
var chemistry_exams_passed = 0;
var canvas_width = 1024;
var canvas_height = 600;


function setup() {
  createCanvas(canvas_width, canvas_height);
  player = new Player();
  evil_img = loadImage('./../assets/img/evil.png');
  big_enemy_img = loadImage('./../assets/img/angel.png');
  wercia_img = loadImage('./../assets/img/Wercia.png')
  compound1 = loadImage('./../assets/img/compound1e.png');
  compound2 = loadImage('./../assets/img/compound2e.png ');
  biology1 = loadImage('./../assets/img/bonee.png ');
}

function draw() {
  background(0);
  if (!loopGame) {
    noLoop();
  }
  player.update();
  player.show();
  handleBullets();
  handleEnemies();
  produceEnemies();
  displayText();

}

function keyPressed() {
  if (key == ' ') {
    player.shoot();
  }
  if (key == "A") {
    player.super_shoot_active = true;
    setTimeout(function() {
      console.log('asd');
      player.super_shoot_active = false;
    }, 4000);
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
      console.log('is out!');
      enemies.splice(i, 1);
    }
  }
}

function produceEnemies() {
  if (frameCount % 40 == 0) {
    produceSingleEnemy();
  }
  if(frameCount % 320 == 0) {
    produceEnemiesBand();
  }
}

function produceSingleEnemy() {
  enemies.push(new Enemy(width + 100, random(height), random(10, 25), random(3, 6), random(-0.4, 0.4)));
}

function produceEnemiesBand() {
  var y = random(height);
  for (let i = 0; i < 8; i++) {
    enemies.push(new BigEnemy(width + 100, y + random(-50, 50), random(10, 25), random(3, 6), random(-0.4, 0.4)));
  }
}

function displayText() {
  textSize(10);
  fill(255);
  text('score: ' + score.toString(), 10, 20);
  fill(0, 200, 10);
  text('bullets: ' + rounds.toString(), 10, 40);
  text('Biologia: ' + current_biology_score + '%', this.width - 200, 20);
  text('Chemia: ' + current_chemistry_score + '%', this.width - 100, 20);
  fill(255, 255, 255);
  text('Zdanych arkuszy:', this.width - 300, 40);
  fill(66, 134, 244);
  textSize(15);
  text(biology_exams_passed.toString(), this.width - 200, 40);
  text(chemistry_exams_passed.toString(), this.width - 100, 40);
}

function upgradeExamPoints(type) {
  if (type) {
    if (current_biology_score < 90) {
      current_biology_score += 10;
    } else {
      current_biology_score = 0;
      biology_exams_passed += 1;
    }
  } else {
    if (current_chemistry_score < 90) {
      current_chemistry_score += 10;
    } else {
      chemistry_exams_passed += 1;
      current_chemistry_score = 0;
    }
  }
}
