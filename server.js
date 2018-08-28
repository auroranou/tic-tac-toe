'use strict';

const express = require('express');
const app = express();
const game = require('./lib/tic-tac-toe');
const validation = require('./lib/validation');

app.get('/', (req, res) => {
  const { board } = req.query;
  if (board === null || board === undefined) {
    throw new Error('No board provided');
  }

  const parsedBoard = validation.isValidBoard(board);
  if (!parsedBoard) {
    throw new Error('Board is invalid');
  }

  if (!validation.isPlayersTurn(parsedBoard)) {
    throw new Error('It\'s not your turn');
  }

  // Check if a board containing a winning move was passed in
  const initialBoardState = game.evaluateBoard(parsedBoard, 'o');
  if (initialBoardState.gameOver && initialBoardState.winner) {
    throw new Error(`${initialBoardState.winner} has already won`);
  }

  const nextMove = game.findNextMove(parsedBoard, 'o');
  res.send(nextMove);
});

const PORT = process.env.port || 3000;
app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`));
