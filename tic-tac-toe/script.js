'use strict';
window.addEventListener('DOMContentLoaded', () => {
  // DOM elements
  const classNames = {
    turn: document.querySelector('.turn'),
    reset: document.querySelector('.reset'),
    gameGrid: document.querySelector('.board-grid'),
    status: document.querySelector('.status'),
    historyBtns: document.querySelector('.historyBtns'),
    previous: document.querySelector('.prev'),
    next: document.querySelector('.next'),
  };

  // game variables
  let gameIsLive = true;
  let currentPlayerX = true;

  // MAKE BOARD
  let board = [
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
  ];

  let history = [
    [
      [0, 1, 2],
      [0, 1, 2],
      [0, 1, 2],
    ],
  ];

  const makeBoard = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        let cell = document.createElement('div');
        cell.setAttribute('class', 'cell');
        cell.setAttribute('id', `${board[j][i]}-${board[i][j]}`);
        classNames.gameGrid.appendChild(cell);
      }
    }
  };
  makeBoard();
  const cells = document.querySelectorAll('.cell');

  const checkGameStatus = (e) => {
    const tl = cells[0].classList[1];
    const ml = cells[1].classList[1];
    const bl = cells[2].classList[1];
    const tm = cells[3].classList[1];
    const mm = cells[4].classList[1];
    const bm = cells[5].classList[1];
    const tr = cells[6].classList[1];
    const mr = cells[7].classList[1];
    const br = cells[8].classList[1];

    // check winner
    //row top
    if (tl && tl === tm && tl === tr) {
      // console.log(tl);
      showWinner(tl);

      // row middle
    } else if (ml && ml === mm && ml === mr) {
      showWinner(ml);

      //row bottom
    } else if (bl && bl === bm && bl === br) {
      showWinner(bl);

      // column top
    } else if (tl && tl === ml && tl === bl) {
      showWinner(tl);

      // column middle
    } else if (tm && tm === mm && tm === bm) {
      showWinner(tm);

      // column right
    } else if (tr && tr === mr && tr === br) {
      showWinner(tr);

      // diagonal
    } else if (tl && tl === mm && tl === br) {
      showWinner(tl);

      // diagonal
    } else if (tr && tr === mm && tr === bl) {
      showWinner(tr);
      // draw
    } else if (tl && tm && tr && ml && mm && mr && bl && bm && br) {
      gameIsLive = false;
      showWinner('Draw!');
    } else {
      currentPlayerX = !currentPlayerX;
      if (currentPlayerX) {
        classNames.turn.textContent = 'X';
      } else {
        classNames.turn.textContent = 'O';
      }
    }
  };

  let historyIndex;
  //show the winner, hide and show the previous and next buttons
  const showWinner = (letter) => {
    gameIsLive = false;
    if (letter === 'X' || letter === 'O') {
      classNames.status.innerHTML = `${letter} has won`;
    } else {
      classNames.status.innerHTML = `${letter}`;
    }
    classNames.previous.style.visibility = 'visible';
    classNames.next.style.visibility = 'hidden';
    historyIndex = history.length;
    for (const gameCell of cells) {
      gameCell.style.pointerEvents = 'none';
    }
  };

  // each click will show x or o
  const cellClickHandler = (e) => {
    // this will prevent adding twice on the same cell
    if (e.target.classList[1] === 'X' || e.target.classList[1] === 'O') {
      return;
    }

    // place x
    let index = e.target.id.match(/\d+/g).map(Number);
    if (currentPlayerX) {
      e.target.classList.add('X');
      board[index[0]][index[1]] = 'X';
      checkGameStatus();

      // place o
    } else {
      e.target.classList.add('O');
      board[index[0]][index[1]] = 'O';
      checkGameStatus();
    }
    let entry = JSON.parse(JSON.stringify(board));
    history.push(entry);
    console.log(history);
  };

  const displayHistory = (index) => {
    for (let row = 0; row < 3; row++) {
      for (let elem = 0; elem < 3; elem++) {
        let element = history[index][row][elem];
        let div = document.getElementById(`${row}-${elem}`);
        if (element === 'X') {
          div.classList.remove('O');
          div.classList.add('X');
        } else if (element === 'O') {
          div.classList.remove('X');
          div.classList.add('O');
        } else {
          div.classList.remove('X');
          div.classList.remove('O');
        }
      }
    }
  };

  const resetHandler = () => {
    // currentPlayerX = true;
    // gameIsLive = true;
    // classNames.status.textContent = `X 's turn`;
    // classNames.previous.style.visibility = 'hidden';
    // classNames.next.style.visibility = 'hidden';
    // for (const cell of cells) {
    //   cell.classList.remove('X');
    //   cell.classList.remove('O');
    //   cell.style.pointerEvents = 'all';
    // }
    // history.length = 1;
    location.reload();
  };

  // previous and next buttons
  const historyBtnsHandlder = (e) => {
    if (e.target.textContent === 'Previous') {
      historyIndex--;
      classNames.next.style.visibility = 'visible';

      if (historyIndex <= 0) {
        historyIndex = 0;
        classNames.previous.style.visibility = 'hidden';
        classNames.next.style.visibility = 'visible';
      }
      displayHistory(historyIndex);
    } else {
      historyIndex++;
      classNames.previous.style.visibility = 'visible';

      if (historyIndex >= history.length - 1) {
        historyIndex = history.length - 1;
        classNames.next.style.visibility = 'hidden';
      }
      displayHistory(historyIndex);
    }
  };

  // 3 event listeners
  classNames.reset.addEventListener('click', resetHandler);
  classNames.historyBtns.addEventListener('click', historyBtnsHandlder);

  const cell = Array.from(cells);
  cell.forEach((eachItem, eachIndex) => {
    eachItem.addEventListener('click', cellClickHandler);
  });
}); // this is for the DOMContentLoaded
