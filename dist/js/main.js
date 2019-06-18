// A $( document ).ready() block.
$(document).ready(function() {
  //gamemodes
  //gamemode One variables
  var $gameOne = $("#gameOne");
  var $gameOneImg = $("#cardMatcherOne img");
  var gameCards = [];
  var shuffledArray = [];
  var imgArray = [];
  var pointsV1 = $("#pointsV1");
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
  //array to hold card variables
  var $cardIds = [
    $cardOne,
    $cardTwo,
    $cardThree,
    $cardFour,
    $cardFive,
    $cardSix
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

  $gameOne.click(function() {
    gameReset();
    let gameCards = cardGenerator();
    shuffledArray = $cardIds.slice($cardIds);
    shuffle(shuffledArray);

    for (i = 0; i < 3; i++) {
      imgArray.push(gameCards[i]);
      imgArray.push(gameCards[i]);
    }
  });
  //reveal image function
  $("#cardMatcherOne img").click(function() {
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
        pointsV1.text(pointCounter);
      }

      if (pointCounter === 3) {
        $("#gameOneResult")
          .append("<h1>CONGRATULATIONS! YOU WIN!</h1>")
          .show();
        $("#gameOneResult").addClass("winnerText");
      }
    } else {
      turnsLeft--;
      turnCounter.text(turnsLeft);
    }

    if (turnsLeft === 0) {
      $gameOneImg.fadeOut(1000);
      $("#gameOneResult")
        .append("<h1>GAME OVER!YOU LOSE!</h1>")
        .show();
      $("#gameOneResult").addClass("loserText");
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

  //global functions
  function cardGenerator() {
    let path = "img/svg-cards/";
    let tmp = $cards.slice($cards);
    let ret = [];

    for (var i = 0; i <= 2; i++) {
      var index = Math.floor(Math.random() * tmp.length);
      var removed = tmp.splice(index, 1);
      // Since we are only removing one element
      ret.push(path + removed[0]);
    }
    return ret;
  }

  //shuffle an array
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

  //reset current cards
  function cardReset() {
    clickCounter = 0;
    for (var i = 0; i <= $cardIds.length; i++) {
      $gameOneImg.attr("src", $defaultCard);
    }
  }

  //resets entire game mode
  function gameReset() {
    $("#gameOneResult")
      .hide()
      .text("");
    clickCounter = 0;
    turnsLeft = 3;
    pointCounter = 0;
    turnCounter.text("3");
    pointsV1.text("0");
    $gameOneImg.show();
    for (var i = 0; i <= $cardIds.length; i++) {
      $gameOneImg.attr("src", $defaultCard);
    }
  }
});
