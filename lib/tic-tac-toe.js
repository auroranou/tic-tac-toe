'use strict';

const constants = require('./constants');
const helpers = require('./helpers');

function findNextMove(currentBoard, currentPlayer) {
  let nextMove;
  minimax(currentBoard, currentPlayer, 0);

  function minimax(board, player, depth) {
    // Base case: this board has a winning/tying play, so the game ends
    const boardState = evaluateBoard(board, player);
    if (boardState.gameOver) {
      console.log('game over: ', player, board);
      return getScore(boardState.winner, depth);
    }

    depth += 1;

    let scores = [];

    const nextBoards = getNextBoards(board, player);
    nextBoards.forEach(b => {
      scores.push(minimax(b, player === 'o' ? 'x' : 'o', depth));
    });
    console.log('\n\ndepth: ', depth, ' player: ', player, '\nboards: ', nextBoards, '\nscores: ', scores);

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

  return helpers.formatBoardStr(nextMove);
}

function getScore(winner, depth) {
  // Tie
  if (!winner) return 0;

  if (winner === 'o') {
    return 1 - depth;
  } else {
    return depth - 1;
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
  const spaces = getSpaces(board, 'empty');
  return spaces.map(spaceIdx => {
    // Create new copies of the board, replacing each empty space with the player's piece
    return Object.assign([], board, { [spaceIdx]: player })
  });
}

function evaluateBoard(board, currentPlayer) {
  if (getSpaces(board, 'empty').length === 0) {
    return {
      gameOver: true,
      winner: null
    };
  }

  // See if there are any winning combinations
  const playerSpaces = getSpaces(board, currentPlayer);
  for (let i = 0; i < constants.LINES.length; i++) {
    if (helpers.isSuperSet(playerSpaces, constants.LINES[i])) {
      return {
        gameOver: true,
        winner: currentPlayer
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