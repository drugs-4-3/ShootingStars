var rounds = 30;

var NO_POWER_CODE = 0;
var RADIAL_SHOOT_CODE = 1;
var MULTIPLE_SHOOT_CODE = 2;

var SUPER_POWER_TIME_LIMIT = 5000;

var SPECIAL_BULLET_COLOR_R = 109;
var SPECIAL_BULLET_COLOR_G = 112;
var SPECIAL_BULLET_COLOR_B = 25;

var FADE_COLOR_RED = 1;
var FADE_COLOR_GREEN = 2;

var FADE_DURATION = 500;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
function getGameOverText() {
  var rand = getRandomInt(0, 6);
  switch (rand) {
    case 0:
      return "UPSI... :<";
    case 1:
      return "NO ALE WERCIA...";
    case 2:
      return "POMYLILO CI SIE??";
    case 3:
      return "MUSZE CI COS POWIEDZIEC...";
    case 4:
      return "OJ. OJOJOJOJ.";
    case 5:
      return "ROZPROSZYLES MNIE";
    default:
      break;
  }
}


// uzytkownik uderza w bonus:
//   bonus znika
//   pobierane sa dane o kodzie bonusu
//   ustawiany jest bonus o danym kodzie na uzytkowniku
//   wyswietla sie znaczek bonusu o danym kodzie w prawym gornym rogu (rozrozniane po kolorach), jesli juz jest - zastepujemy
