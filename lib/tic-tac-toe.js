'use strict';

const constants = require('./constants');

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

function getScore(winner, depth) {
  if (winner === 'o') {
    return 10 - depth;
  } else {
    return depth - 10;
  }

  return 0;
}

function getSpaces(board, spaceType) {
  return (board).reduce((memo, curr, i) => {
    if (curr === spaceType) {
      memo.push(i);
    }
    return memo;
  }, []);
}

function getNextBoards(board, spaces, player) {
  return spaces.map(spaceIdx => {
    // Create new copies of the board, replacing each empty space with the player's piece
    return Object.assign([], board, { [spaceIdx]: player })
  });
}

function evaluateBoard(board) {
  if (getSpaces(board, ' ').length === 0) {
    return {
      gameOver: true,
      winner: null
    };
  }

  // See if there are any winning combinations
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
  getNextBoards,
}