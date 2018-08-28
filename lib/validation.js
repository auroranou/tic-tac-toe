'use strict';

function isValidBoard(str) {
  if (str.length !== 9) {
    return false;
  }

  let board = [];

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (!isValidChar(char)) {
      return false;
    }

    board.push(char === ' ' ? 'empty' : char);
  }

  return board;
}

function isValidChar(char) {
  return ['o', 'x', ' '].indexOf(char) > -1;
}

/**
 * Verify that there is space on the board and that it is o's turn
 * @param {Array} board 
 */
function isPlayersTurn(board) {
  let counts = {
    empty: 0,
    o: 0,
    x: 0
  };

  board.reduce((memo, curr) => {
    if (memo[curr] !== null && memo[curr] !== undefined) {
      memo[curr] += 1;
    }
    return memo;
  }, counts);

  return counts.empty > 0 && (counts.x >= counts.o);
}

module.exports = {
  isValidBoard,
  isValidChar,
  isPlayersTurn
}