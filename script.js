"use strict";

// Selecting elements
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const currentScore0El = document.querySelector("#current--0");
const currentScore1El = document.querySelector("#current--1");

const dice = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  dice.classList.add("hidden");

  document.querySelector(".player--0").classList.remove("player--winner");

  document.querySelector(".player--1").classList.remove("player--winner");

  document.querySelector(".player--0").classList.add("player--active");

  document.querySelector(".player--1").classList.remove("player--active");

  document.getElementById("current--0").textContent = 0;

  document.getElementById("current--1").textContent = 0;
};

init();

const switchActivePlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle("player--active");

  activePlayer = activePlayer === 0 ? 1 : 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle("player--active");
};

// Rolling dice functionality
btnRoll.addEventListener("click", () => {
  if (playing) {
    // 1. Generating a random dice roll
    let roll = Math.trunc(Math.random() * 6 + 1);

    // 2. Display dice
    dice.src = `./public/dice-${roll}.png`;
    dice.classList.remove("hidden");

    // 3. If roll is 1 switch current player
    if (roll !== 1) {
      currentScore += roll;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchActivePlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;

    // Display the updated score
    activePlayer === 0
      ? (score0.textContent = scores[activePlayer])
      : (score1.textContent = scores[activePlayer]);

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--active");
    } else {
      // 3. Switch to the next player if score < 100
      switchActivePlayer();
    }
  }
});

btnNew.addEventListener("click", () => {
  init();
});
