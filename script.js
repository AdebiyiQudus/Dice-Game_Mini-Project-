'use strict';

/* NB: Player 1 is player 0 in our code while player 2 is player 1 in our code */
// change line 85 and 90 andd also 110,111 and 117

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// class of score  'score--0' for player 0 (first player) total score
const score0El = document.querySelector('#score--0');

// class of score  'score--1' for player 1 (second player) total score
const score1El = document.getElementById('score--1');
// class of current 'current--0' for player 0 (first player) current score
const current0El = document.getElementById('current--0');
// class of current 'current--1' for player 1 (second player) current score
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
// Hold 0 whenever it is player 0 and hold 1 whenever it is player 1
const btnHold = document.querySelector('.btn--hold');

// Define all these variables outside in order to be able to access them inside the init function
let scores, currentScore, activePlayer, playing;

// To set all the variable back to the initial state, we will create a function called init (initialization) which will contain the reset and starting conditions of the game
const init = function () {
  // STARTING CONDITIONS
  // store both player total score in an array [0,0] at the starting of the game (Total score)
  scores = [0, 0];
  currentScore = 0;

  // player 1 is set to be the active  player initially that's why is set to = 0
  activePlayer = 0;
  // Set playing to true when starting the game and if playing is set to false when the game is finished, the playing code block will stop executing
  playing = true;

  // RESETING THE GAME ALL OVER
  // Reset both  players total score to 0 when restarting the game
  score0El.textContent = 0;
  score1El.textContent = 0;

  // Reset both players current score to 0
  current0El.textContent = 0;
  current1El.textContent = 0;

  // To remove or hide the dice at the starting of the game
  diceEl.classList.add('hidden');
  // Remove the player winner class from both player element
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  // Remove active class for player 2 and add active class for player 1 coz after restarting the game player 1 will be the first to start the new game as been set initially => activePlayer = 0;
  player0El.classList.add('player-active');
  player1El.classList.remove('player-active');
};
// We want the init function to be executed whenever the page reloads and also when the btnNew (New game button) is clicked
init();

const switchPlayer = function () {
  // if the active player roll a dice and is == 1 switch to the next player and display the current active player score to 0 and
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //  Reset the next player current score to 0
  currentScore = 0;
  // If the active player is 0 (player 1), then we want the new active player to be 1 (player 2) else if the active player is (player 1) we want the new active player to be (player 0)
  activePlayer = activePlayer === 0 ? 1 : 0;

  // To change the player active class use toggle() method  => will remove the active class if it is there and add the class if it's not there
  player0El.classList.toggle('player--active'); // remove the active class from the player 0 if it's there and add the class if it's not there
  player1El.classList.toggle('player--active'); // remove the active class from the player 1 if it's there and add the class if it's not there
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  // if (playing) => execute the code block
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Diplay dice
    diceEl.classList.remove('hidden');
    // Display dice in respect to the random number generated
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      // Display the current score for the active player in the UI
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Call the switchPlayer function to execute switching of player code
      switchPlayer(); // Switch to the next player
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add the current score to the active player's total score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    // Display the current active player total score in the UI
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if the player score is >= 20
    if (scores[activePlayer] >= 20) {
      // Finish the game
      playing = false;
      // Remove the dice after the game has ended
      diceEl.classList.add('hidden');

      // Display the player whose score is >= 20 and also add the class of 'player-winner'
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      // Remove the active player class when a player wins
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});
// init function get executed as soon as the user clicks on the newBtn(New game button)
btnNew.addEventListener('click', init);
