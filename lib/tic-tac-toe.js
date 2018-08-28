'use strict';

const constants = require('./constants');

function findNextMove(currentBoard, currentPlayer) {
  let nextMove = [];

  minimax(currentBoard, currentPlayer, 0);

  function minimax(board, player) {
    // Base case: this board has a winning/tying play, so the game ends
    const boardState = evaluateBoard(board);
    if (boardState.gameOver) {
      console.log('game over: ', player, boardState, board);
      return getScore(boardState.winner);
    }

    let scores = [];

    const nextBoards = getNextBoards(board, player);
    nextBoards.forEach(b => {
      scores.push(minimax(b, player === 'o' ? 'x' : 'o'));
    });
    console.log(' player: ', player, '\nboards: ', nextBoards, '\nscores: ', scores);

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

  console.log(nextMove);

  return nextMove;
}

function getScore(winner) {
  // Tie
  if (!winner) return 0;

  if (winner === 'o') {
    return 1;
  } else {
    return -1;
  }
}

function getSpaces(board, spaceType) {
  return (board).reduce((memo, curr, i) => {
    if (curr === spaceType) {
      memo.push(i);
    }
    return memo;
  }, []);
}

function getNextBoards(board, player) {
  const spaces = getSpaces(board, ' ');
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