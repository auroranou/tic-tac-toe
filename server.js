'use strict';

const express = require('express');
const app = express();
const game = require('./tic-tac-toe');

app.get('/', (req, res) => {
  const { board } = req.query;
  if (board === null || board === undefined) {
    throw new Error('No board provided');
  }

  const parsedBoard = game.isValidBoard(board);
  if (!parsedBoard) {
    throw new Error('Board is invalid');
  }

  if (!game.isPlayersTurn(board)) {
    throw new Error('It\'s not your turn');
  }

  res.send(JSON.stringify(parsedBoard));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`));
