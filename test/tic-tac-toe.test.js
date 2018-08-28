'use strict';

const game = require('../lib/tic-tac-toe');

describe('finding spaces and possible moves', () => {
  const board = ['x', 'x', ' ', 'o', 'o', 'x', ' ', ' ', 'o'];

  it('should find all of the empty spaces in a board object', () => {
    expect(game.getSpaces(board, ' ')).toEqual([2, 6, 7]);
  });

  it('should find all spaces belonging to a given player', () => {
    expect(game.getSpaces(board, 'x')).toEqual([0, 1, 5
    ]);
    expect(game.getSpaces(board, 'o')).toEqual([3, 4, 8]);
  });
});

it('correctly assesses when a game is over', () => {
  // x wins
  const board1 = ['x', 'o', 'o', ' ', 'x', 'o', ' ', ' ', 'x'];
  expect(game.evaluateBoard(board1)).toEqual({
    gameOver: true,
    winner: 'x'
  });

  // Tie (no empty spaces)
  const board2 = ['o', 'x', 'o', 'o', 'x', 'x', 'x', 'o', 'x'];
  expect(game.evaluateBoard(board2)).toEqual({
    gameOver: true,
    winner: null
  });
});

it('chooses the optimal next move', () => {
  const board = [' ', 'x', 'x', 'o', ' ', ' ', 'o', ' ', ' '];
  expect(game.findNextMove(board, 'o')).toEqual([
    'o', 'x', 'x', 'o', ' ', ' ', 'o', ' ', ' '
  ]);
});