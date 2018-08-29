'use strict';

/**
 * Check that the board contains sufficient characters and only valid characters
 * @param {String} str 
 */
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

    board.push(char);
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
    const key = curr === ' ' ? 'empty' : curr;
    if (memo[key] !== null && memo[key] !== undefined) {
      memo[key] += 1;
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