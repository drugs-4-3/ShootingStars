var rounds = 30;

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
