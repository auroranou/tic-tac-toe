'use strict';

const constants = require('./constants');

/**
 * Given the original board and player (o), recursively calls minimax to find the optimal next move for o
 * @param {Array} currentBoard 
 * @param {String} currentPlayer 
 */
function findNextMove(currentBoard, currentPlayer) {
  let nextMove = [];

  minimax(currentBoard, currentPlayer);

  function minimax(board, player, depth = 0) {
    // Base case: this board has a winning/tying play, so the game ends
    const boardState = evaluateBoard(board);
    if (boardState.gameOver) {
      return getScore(boardState.winner, depth);
    }

    let scores = [];
    let nextBoards = [];

    const spaces = getSpaces(board, ' ');
    spaces.forEach((spaceIdx) => {
      const nextBoard = Object.assign([], board, { [spaceIdx]: player });
      const nextPlayer = player === 'o' ? 'x' : 'o';
      scores.push(minimax(nextBoard, nextPlayer, depth + 1));
      nextBoards.push(nextBoard);
    });

    // Attempt to maximize scores for ourself/minimize scores for opponent
    if (player === 'o') {
      const maxIdx = scores.indexOf(Math.max(...scores));
      nextMove = nextBoards[maxIdx];
      return scores[maxIdx];
    } else {
      const minIdx = scores.indexOf(Math.min(...scores));
      nextMove = nextBoards[minIdx];
      return scores[minIdx];
    }
  }

  return nextMove;
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