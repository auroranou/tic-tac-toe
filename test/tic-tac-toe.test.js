'use strict';

const game = require('../lib/tic-tac-toe');

describe('finding spaces and possible moves', () => {
  const board = ['x', 'x', 'empty', 'o', 'o', 'x', 'empty', 'empty', 'o'];

  it('should find all of the empty spaces in a board object', () => {
    expect(game.getSpaces(board, 'empty')).toEqual([2, 6, 7]);
  });

  it('should find all spaces belonging to a given player', () => {
    expect(game.getSpaces(board, 'x')).toEqual([0, 1, 5
    ]);
    expect(game.getSpaces(board, 'o')).toEqual([3, 4, 8]);
  });

  it('should create all possible next boards for a player ', () => {
    expect(game.getNextBoards(board, 'o')).toEqual([
      ['x', 'x', 'o', 'o', 'o', 'x', 'empty', 'empty', 'o'],
      ['x', 'x', 'empty', 'o', 'o', 'x', 'o', 'empty', 'o'],
      ['x', 'x', 'empty', 'o', 'o', 'x', 'empty', 'o', 'o']
    ]);
  });
});

it('correctly assesses when a game is over', () => {
  // x wins
  const board1 = ['x', 'o', 'o', 'empty', 'x', 'o', 'empty', 'empty', 'x'];
  expect(game.evaluateBoard(board1, 'x')).toEqual({
    gameOver: true,
    winner: 'x'
  });

  // Tie (no empty spaces)
  const board2 = ['o', 'x', 'o', 'o', 'x', 'x', 'x', 'o', 'x'];
  expect(game.evaluateBoard(board2, 'x')).toEqual({
    gameOver: true,
    winner: null
  });
});

