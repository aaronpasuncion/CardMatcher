// A $( document ).ready() block.
$(document).ready(function() {
  //gamemodes
  //gamemode One variables
  var $gameStart = $("#gameStart");
  var $gameImg = $("#cardMatcher img");
  var $gameResult = $("#gameResult");
  var shuffledArray = [];
  var imgArray = [];
  var points = $("#points");
  var pointCounter = 0;
  var turnCounter = $("#turnCounter");
  var turnsLeft = 3;
  var imgOne;
  var imgTwo;
  //universal counter
  var clickCounter = 0;
  //card variables
  var $cardOne = $("#cardOne");
  var $cardTwo = $("#cardTwo");
  var $cardThree = $("#cardThree");
  var $cardFour = $("#cardFour");
  var $cardFive = $("#cardFive");
  var $cardSix = $("#cardSix");
  var $cardSeven = $("#cardSeven");
  var $cardEight = $("#cardEight");
  //array to hold card variables
  var $cardIds = [
    $cardOne,
    $cardTwo,
    $cardThree,
    $cardFour,
    $cardFive,
    $cardSix,
    $cardSeven,
    $cardEight
  ];
  //card images
  var $defaultCard = "img/svg-cards/default-card/red_joker.svg";
  var $cards = [
    "jack_of_clubs.svg",
    "jack_of_hearts.svg",
    "jack_of_spades.svg",
    "jack_of_diamonds.svg",
    "queen_of_clubs.svg",
    "queen_of_diamonds.svg",
    "king_of_clubs.svg",
    "king_of_hearts.svg",
    "king_of_spades.svg",
    "king_of_diamonds.svg"
  ];

  // Starts the game
  $gameStart.click(function() {
    gameReset();
    let gameCards = cardGenerator();
    shuffledArray = $cardIds.slice($cardIds);
    shuffle(shuffledArray);

    for (i = 0; i <= 3; i++) {
      imgArray.push(gameCards[i]);
      imgArray.push(gameCards[i]);
    }
  });

  //reveal image function
  $gameImg.click(function() {
    let currentImage = $(this);

    if (clickCounter === 0) {
      cardReveal(currentImage);
      imgOne = $(this);
    } else if (clickCounter === 1) {
      cardReveal(currentImage);
      imgTwo = $(this);
    }

    setTimeout(function() {
      if (clickCounter === 2) {
        cardMatch(imgOne, imgTwo);
      }
    }, 2000);
  });

  //card match function
  function cardMatch(firstImage, secondImage) {
    if (imgOne.attr("src") === imgTwo.attr("src")) {
      if (imgOne.attr("id") === imgTwo.attr("id")) {
        alert("You cannot select the same card!");
        clickCounter--;
        return;
      } else {
        imgOne.fadeOut(1000);
        imgTwo.fadeOut(1000);
        pointCounter++;
        points.text(pointCounter);
      }

      if (pointCounter === 4) {
        $gameResult.append("<h1>CONGRATULATIONS! YOU WIN!</h1>").show();
        $gameResult.addClass("winnerText");
      }
    } else {
      turnsLeft--;
      turnCounter.text(turnsLeft);
    }

    if (turnsLeft === 0) {
      $gameImg.fadeOut(1000);
      $gameResult.append("<h1>GAME OVER!YOU LOSE!</h1>").show();
      $gameResult.addClass("loserText");
    }
    cardReset();
  }

  //card Reveal function
  function cardReveal(selectedImg) {
    for (var i = 0; i < shuffledArray.length; i++) {
      if (
        shuffledArray[i].attr("id").toString() ===
        selectedImg.attr("id").toString()
      ) {
        clickCounter++;
        selectedImg.attr("src", imgArray[i]);
      }
    }
  }

  // cardGenerator() - generates 4 cards from the $cards Array to be used for the card matching game

  function cardGenerator() {
    let path = "img/svg-cards/";
    let tmp = $cards.slice($cards);
    let ret = [];

    for (var i = 0; i <= 3; i++) {
      var index = Math.floor(Math.random() * tmp.length);
      var removed = tmp.splice(index, 1);
      // Since we are only removing one element
      ret.push(path + removed[0]);
    }
    return ret;
  }

  // Shuffles an array
  function shuffle(array) {
    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  // Reset current cards
  function cardReset() {
    clickCounter = 0;
    for (var i = 0; i <= $cardIds.length; i++) {
      $gameImg.attr("src", $defaultCard);
    }
  }

  // Resets entire game mode
  function gameReset() {
    $gameResult.hide().text("");
    clickCounter = 0;
    turnsLeft = 5;
    pointCounter = 0;
    turnCounter.text("5");
    points.text("0");
    $gameImg.show();
    for (var i = 0; i <= $cardIds.length; i++) {
      $gameImg.attr("src", $defaultCard);
    }
  }
});
