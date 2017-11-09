var player;
var enemies = [];
var bullets = [];
var loopGame = true;


function setup() {
  createCanvas(1024, 600);
  player = new Player();
  evil_img = loadImage('./../assets/img/evil.png');
  big_enemy_img = loadImage('./../assets/img/angel.png');
  wercia_img = loadImage('./../assets/img/Wercia.png')
  compound1 = loadImage('./../assets/img/compound1e.png');
  compound2 = loadImage('./../assets/img/compound2e.png');
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
        enemies[j].destroy();
        enemies.splice(j, 1);
        bullets.splice(i, 1);
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
}
