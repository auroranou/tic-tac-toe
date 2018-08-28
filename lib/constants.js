const ROWS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8]
];

const COLUMNS = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
];

const DIAGONALS = [
  [0, 4, 8],
  [2, 4, 6]
];

const LINES = ROWS.concat(COLUMNS).concat(DIAGONALS);

module.exports = {
  LINES
};