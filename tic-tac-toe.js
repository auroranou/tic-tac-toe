'use strict';

function isValidBoard(str) {
  if (str.length !== 9) {
    return false;
  }

  let board = {};

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (!isValidChar(char)) {
      return false;
    }

    board[i] = char === ' ' ? 'empty' : char;
  }

  return board;
}

function isValidChar(char) {
  return ['o', 'x', ' '].indexOf(char) > -1;
}

function isPlayersTurn(str) {
  const board = str.split('');
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

function findNextMove(board) {

}

module.exports = {
  isValidBoard,
  isPlayersTurn
}