'use strict';

const express = require('express');
const app = express();
const game = require('./lib/tic-tac-toe');
const validation = require('./lib/validation');

app.get('/', (req, res) => {
  const { board } = req.query;
  if (board === null || board === undefined) {
    res.status(400).send('No board provided');
  }

  const parsedBoard = validation.isValidBoard(board);
  if (!parsedBoard) {
    res.status(400).send('Board is invalid');
  }

  if (!validation.isPlayersTurn(parsedBoard)) {
    res.status(400).send('It\'s not your turn');
  }

  // Check if a board containing a winning move was passed in
  const initialBoardState = game.evaluateBoard(parsedBoard, 'o');
  if (initialBoardState.gameOver && initialBoardState.winner) {
    res.status(400).send(`${initialBoardState.winner} has already won`);
  }

  const nextMove = game.findNextMove(parsedBoard, 'o');
  res.send(nextMove.join(''));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`));
