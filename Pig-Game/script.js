'use strict';
window.addEventListener('DOMContentLoaded', () => {
  //buttons
  const btnNew = document.querySelector('.btn-new'),
    btnRoll = document.querySelector('.btn-roll'),
    btnHold = document.querySelector('.btn-hold');

  //UI Variables
  const playerSection0 = document.querySelector('.player-0-panel'),
    playerSection1 = document.querySelector('.player-1-panel'),
    playerName0 = document.querySelector('#name-0'),
    playerName1 = document.querySelector('#name-1'),
    globalScore0 = document.querySelector('#score-0'),
    globalScore1 = document.querySelector('#score-1'),
    score0El = document.querySelector('#current-0'),
    score1El = document.querySelector('#current-1'),
    diceDisplay = document.querySelector('.dice');

  //Modal Variables
  const btnAboutGame = document.querySelector('.aboutTheGame-btn'),
    modalContainer = document.querySelector('.modal-container'),
    modalCloseBtn = document.querySelector('.modal-close-btn'),
    playerInputsBtn = document.querySelector('.playerInputs-btn'),
    formContainer = document.querySelector('.form-container'),
    formSaveBtn = document.querySelector('.save-btn');

  //Form Variables
  let formInputName0 = document.querySelector('#player-0'),
    formInputName1 = document.querySelector('#player-1'),
    winningNumber = document.querySelector('#winning-number');

  let winScore = document.querySelector('.win-score');
  let winValue = 30;

  let rollDiceSound = new Audio('sounds/rolldice.wav'),
    wrongSound = new Audio('sounds/wrong.wav'),
    goldSound = new Audio('sounds/gold.wav'),
    winnerSound = new Audio('sounds/winnerSound.wav'),
    ifYouKnow = new Audio('sounds/mixkit.wav'),
    winImage = document.querySelector('.win-image');

  //Game Variables
  let score, currentScore, activePlayer, gameIsActive;

  // Start the game
  const init = () => {
    score = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    gameIsActive = true;

    diceDisplay.classList.add('hidden');
    score0El.textContent = 0;
    score1El.textContent = 0;
    globalScore0.textContent = 0;
    globalScore1.textContent = 0;
    playerSection0.classList.add('active');
    playerSection1.classList.remove('active');
    playerSection0.classList.remove('winner');
    playerSection1.classList.remove('winner');
    btnRoll.classList.remove('hidden');
    btnHold.classList.add('hidden');
    btnHold.style.top = '700px';

    modalContainer.classList.add('hidden');
    document.querySelector(`.current-box-0`).style.display = 'block';
    document.querySelector(`.current-box-1`).style.display = 'block';

    winningNumber.style.display = 'block';
    winImage.style.display = 'none';

    ifYouKnow.play();
  };
  init();

  const switchPlayer = () => {
    currentScore = 0;
    document.querySelector(
      `#current-${activePlayer}`
    ).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerSection0.classList.toggle('active');
    playerSection1.classList.toggle('active');
  };

  const rollDice = () => {
    let randomNum = Math.trunc(Math.random() * 5) + 1; // random number generator
    diceDisplay.src = `dice-${randomNum}.png`; // randomize the dice
    diceDisplay.classList.remove('hidden'); // display the random dice
    btnHold.style.top = '520px';
    rollDiceSound.play();
    winningNumber.style.display = 'none';
    btnHold.classList.remove('hidden');
    diceDisplay.classList.add('rotate-center');
    setTimeout(() => diceDisplay.classList.remove('rotate-center'), 250);

    if (gameIsActive) {
      //if rolled dice is not 1, add random number to the current score
      if (randomNum !== 1) {
        currentScore += randomNum; // update the current score
        document.querySelector(
          `#current-${activePlayer}`
        ).textContent = currentScore;

        //if rolled dice is 1, switch player
      } else {
        wrongSound.play();
        switchPlayer();
      }
    }
  };

  const holdDice = () => {
    if (gameIsActive) {
      score[activePlayer] += currentScore; // update score depending on who is rolling
      document.querySelector(`#score-${activePlayer}`).textContent =
        score[activePlayer];

      // if winning number reached, end the game.
      if (score[activePlayer] >= winValue) {
        gameIsActive = false;
        diceDisplay.classList.add('hidden');
        btnRoll.classList.add('hidden');
        btnHold.classList.add('hidden');
        document
          .querySelector(`.player-${activePlayer}-panel`)
          .classList.add('winner');
        document.querySelector(`.current-box-${activePlayer}`).style.display =
          'none';
        winnerSound.play();
        winImage.style.display = 'block';

        // if not yet reached the game winning number, switch player
      } else {
        if (currentScore >= 1) {
          //if current score is 0, don't play sound
          goldSound.play();
        }
        switchPlayer();
      }
    }
  };

  //Modal
  const hideHandler = e => {
    modalContainer.classList.remove('modal-active');
  };

  const showHandler = e => {
    if (e.target.textContent === 'Instructions') {
      modalContainer.classList.add('modal-active');
    } else {
      formContainer.classList.add('form-active');
    }
  };

  const saveState = e => {
    formContainer.classList.remove('form-active');

    if (formInputName0.value === '') {
      // for player 1 name
      playerName0.innerHTML = 'Peppa';
    } else {
      playerName0.innerHTML = formInputName0.value;
    }

    if (formInputName1.value === '') {
      // for player 2 name
      playerName1.innerHTML = 'Pumba';
    } else {
      playerName1.innerHTML = formInputName1.value;
    }

    if (winningNumber.value === '') {
      winValue = 30;
    } else {
      winValue = winningNumber.value;
      winScore.textContent = winValue;
    }
  };

  // Event Listeners
  btnNew.addEventListener('click', init);
  btnRoll.addEventListener('click', rollDice);
  btnHold.addEventListener('click', holdDice);
  btnAboutGame.addEventListener('click', showHandler);
  modalCloseBtn.addEventListener('click', hideHandler);
  playerInputsBtn.addEventListener('click', showHandler);
  formSaveBtn.addEventListener('click', saveState);
});
