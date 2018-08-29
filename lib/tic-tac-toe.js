'use strict';

const constants = require('./constants');

/**
 * Given the original board and player (o), recursively calls minimax to find the optimal next move for o
 * @param {Array} currentBoard 
 * @param {String} currentPlayer 
 */
function findNextMove(currentBoard, currentPlayer) {
  return minimax(currentBoard, currentPlayer);

  function minimax(board, player, depth = 0) {
    const boardState = evaluateBoard(board);
    if (boardState.gameOver) {
      return getScore(boardState.winner, depth);
    }

    let val = player === 'o' ? -1000 : 1000;
    let nextMove = [];
    const nextPlayer = player === 'o' ? 'x' : 'o';
    const spaces = getSpaces(board, ' ');

    spaces.forEach(spaceIdx => {
      const nextBoard = Object.assign([], board, { [spaceIdx]: player });
      const nextVal = minimax(nextBoard, nextPlayer, depth + 1);

      if (player === 'o' && nextVal >= val
        || player === 'x' && nextVal <= val) {
        val = nextVal;
        nextMove = nextBoard;
      }
    });

    if (depth === 0) {
      return nextMove;
    } else {
      return val;
    }
  }
}

/**
 * Given the winner for a particular game and the depth in the recursion tree, returns a weighted value
 * @param {String} winner 
 * @param {Number} depth 
 */
function getScore(winner, depth) {
  if (!winner) return 0;

  if (winner === 'o') {
    return 10 - depth;
  } else {
    return depth - 10;
  }
}

/**
 * Find indices of spaces containing x, o, or ' ' characters
 * @param {Array} board 
 * @param {String} spaceType 
 */
function getSpaces(board, spaceType) {
  return (board).reduce((memo, curr, i) => {
    if (curr === spaceType) {
      memo.push(i);
    }
    return memo;
  }, []);
}

/**
 * Iterate over the board to see if any winning moves have been played
 * @param {Array} board 
 */
function evaluateBoard(board) {
  if (getSpaces(board, ' ').length === 0) {
    return {
      gameOver: true,
      winner: null
    };
  }

  // Check if any winning lines are populated by x or o
  for (let i = 0; i < constants.LINES.length; i++) {
    const [i1, i2, i3] = constants.LINES[i];

    if (board[i1] !== ' '
      && board[i1] === board[i2]
      && board[i2] === board[i3]) {
      return {
        gameOver: true,
        winner: board[i1]
      };
    }
  }

  return {
    gameOver: false,
    winner: null
  };
}

module.exports = {
  evaluateBoard,
  findNextMove,
  getSpaces,
}