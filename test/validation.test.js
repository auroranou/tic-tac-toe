'use strict';

const validation = require('../lib/validation');

// Board validation
it('checks that the board contains only 9 characters', () => {
  const tooShort = 'xx o ';
  expect(validation.isValidBoard(tooShort)).toBe(false);
});

it('checks that only valid characters are allowed', () => {
  const invalidChars = 'abcde123&';
  expect(validation.isValidBoard(invalidChars)).toBe(false);
});

it('returns an array when board is valid', () => {
  const validChars = 'xx oox  o';
  const expected = ['x', 'x', ' ', 'o', 'o', 'x', ' ', ' ', 'o'];
  expect(validation.isValidBoard(validChars)).toEqual(expected);
});

it("correctly gauges if o can play", () => {
  // Player x goes first
  const board1 = [' ', ' ', ' ', ' ', 'x', ' ', ' ', ' ', ' '];
  expect(validation.isPlayersTurn(board1)).toBe(true);

  // Player o goes first
  const board2 = [' ', ' ', ' ', 'o', 'x', ' ', ' ', ' ', ' '];
  expect(validation.isPlayersTurn(board2)).toBe(true);

  // Invalid player state
  const board3 = [' ', ' ', ' ', 'o', 'x', 'o', ' ', ' ', ' '];
  expect(validation.isPlayersTurn(board3)).toBe(false);
});