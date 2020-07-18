let tileImages = [];
let tileArray = [];
let tileFlippedOver = [];
let cardFlipped = -1;
let timer = "";
let playLockout = false;
let startButton = document.getElementById("start");
let gameBoard = document.getElementById("gameboard");
let gamePlay = false;
let message = document.getElementById("message");

//event listens
startButton.addEventListener("click", startGame);

//Functions
function startGame() {
  playLockout = false;
  startButton.style.display = "none";
  if (!gamePlay) {
    gamePlay = true;
    buildArray();
    tileArray = tileImages.concat(tileImages);
    shuffleArray(tileArray);
    buildBoard();
    message.innerHTML = "click any tile";
  }
}

function gameOver() {
  startButton.style.display = "block";
  message.innerHTML = "click to start new game";
  gamePlay = false;
  tileImages = [];
  tileFlippedOver = [];
}

function buildBoard() {
  let html = "";
  for (let x = 0; x <= tileArray.length - 1; x++) {
    html += '<div class="gameTile"><div class="gameTile">';
    html +=
      '<img id="cardz' +
      x +
      '" src="asset/index.png" onclick="pickCard(' +
      x +
      ',this)" class="flipImage"></div></div>';
  }
  gameBoard.innerHTML = html;
}

function isinArray(v, array) {
  return array.indexOf(v) > -1;
}

function cardFlip(t, ti) {
  t.src = "asset/" + tileArray[ti];
  tileFlippedOver.push(t.id);
  console.log(tileFlippedOver);
}

function hideCard() {
  for (let x = 0; x < 2; x++) {
    let vid = tileFlippedOver.pop();
    document.getElementById(vid).src = "asset/index.png";
    console.log(vid);
  }
  clearInterval(timer);
  playLockout = false;
  cardFlipped = -1;
  message.innerHTML = "click any tile";
}

function checkSrc(v) {
  var v = document.getElementById(v).src;
  return v;
}

function pickCard(tileIndex, t) {
  // check if its already flipped
  message.innerHTML = "check for match";
  if (!isinArray(t.id, tileFlippedOver) && !playLockout) {
    console.log("not in array");
    if (cardFlipped >= 0) {
      cardFlip(t, tileIndex);
      let secondCard = tileIndex;
      playLockout = true;
      if (
        checkSrc(tileFlippedOver[tileFlippedOver.length - 1]) ==
        checkSrc(tileFlippedOver[tileFlippedOver.length - 2])
      ) {
        //Match
        message.innerHTML = "Match found click more tiles";
        playLockout = false;
        cardFlipped = -1;
        if (tileFlippedOver.length == tileArray.length) {
          gameOver();
        }
      } else {
        //No Match
        console.log("No Match");
        timer = setInterval(hideCard, 800);
      }
    } else {
      cardFlipped = tileIndex;
      cardFlip(t, tileIndex);
    }
  } else {
    message.innerHTML = "not clickable";
  }
}

function buildArray() {
  for (let x = 1; x < 7; x++) {
    tileImages.push(x + ".png");
  }
}

function shuffleArray(array) {
  for (let x = array.length - 1; x > 0; x--) {
    let holder = Math.floor(Math.random() * (x + 1));
    let itemValue = array[x];
    array[x] = array[holder];
    array[holder] = itemValue;
  }
  return array;
}
