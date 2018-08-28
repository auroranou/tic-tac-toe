'use strict';

const game = require('../tic-tac-toe');

// Board validation
it('checks that the board contains only 9 characters', () => {
  const tooShort = 'xx o ';
  expect(game.isValidBoard(tooShort)).toBe(false);
});

it('checks that only valid characters are allowed', () => {
  const invalidChars = 'abcde123&';
  expect(game.isValidBoard(invalidChars)).toBe(false);
});

it('returns an object when board is valid', () => {
  const validChars = 'xx oox  o';
  const expected = {
    0: 'x',
    1: 'x',
    2: 'empty',
    3: 'o',
    4: 'o',
    5: 'x',
    6: 'empty',
    7: 'empty',
    8: 'o'
  };
  expect(game.isValidBoard(validChars)).toEqual(expected);
});

it("correctly gauges if o can play", () => {
  // Player x goes first
  const board1 = '    x    ';
  expect(game.isPlayersTurn(board1)).toBe(true);

  // Player o goes first
  const board2 = '   ox    ';
  expect(game.isPlayersTurn(board2)).toBe(true);

  // Invalid player state
  const board3 = '   oxo   ';
  expect(game.isPlayersTurn(board3)).toBe(false);
});