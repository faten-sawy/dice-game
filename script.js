'use strict';

const firstPlayerScore = document.querySelector('#score--0');
const secondPlayerScore = document.querySelector('#score--1');
const dice = document.querySelector('.dice');
//Buttons
const rollButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');
const newGameButton = document.querySelector('.btn--new');

const firstPlayer = document.querySelector('.player--0');
const secondPlayer = document.querySelector('.player--1');
const currentFirstPlayer = document.querySelector('#current--0');

// 1- initial values
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
firstPlayerScore.textContent = 0;
secondPlayerScore.textContent = 0;
dice.classList.add('hide');

rollButton.addEventListener('click', function () {
  dice.classList.remove('hide');
  const diceNumber = Math.trunc(Math.random() * 6) + 1;
  dice.src = `dice-${diceNumber}.png`;

  if (diceNumber !== 1) {
    // add diceNumber to score
    currentScore += diceNumber;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
  } else {
    // switch player
    switchPlayer();
  }
  console.log(activePlayer);
});

holdButton.addEventListener('click', function () {
  //add current score to player's score
  scores[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];

  //check if score >=100
  if (scores[activePlayer] >= 20) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    //disable buttons to stop game
    rollButton.disabled = true;
    holdButton.disabled = true;
  } else {
    //switch player
    switchPlayer();
  }
});

newGameButton.addEventListener('click', function () {
  //initial every thing
  currentScore = 0;
  scores = [0, 0];
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');

  rollButton.disabled = false;
  holdButton.disabled = false;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  firstPlayerScore.textContent = 0;
  secondPlayerScore.textContent = 0;
  dice.classList.add('hide');
});

function switchPlayer() {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  firstPlayer.classList.toggle('player--active');
  secondPlayer.classList.toggle('player--active');
}
