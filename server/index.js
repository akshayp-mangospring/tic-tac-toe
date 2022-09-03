const cors = require('cors');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const { clientUrl, port } = require('./utils/env');
const { oPlayer, xPlayer } = require('./utils/constants');
const { checkPlayerWon, setupGameState } = require('./utils/game');

const app = express();
app.use(cors);

const server = http.createServer(app);

// Socket Server
const io = new Server(server, {
  cors: {
    origin: clientUrl,
    methods: ['GET', 'POST'],
  },
});

let currentPlayer = xPlayer;
let gameState = setupGameState();

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('place_marker', ({ position }) => {
    gameState.setCell(position, currentPlayer.marker);

    // Server Emits to every connected client
    io.emit('marker_placed', {
      currentPlayer,
      gameState: {
        cells: gameState.cells,
        canComputeWinner: gameState.canComputeWinner(),
        isBoardFilled: gameState.isBoardFilled(),
      },
      position,
    });

    const { hasWon, winCombo } = checkPlayerWon(gameState.cells, currentPlayer);

    if (hasWon) {
      io.emit('game_won', {
        winCombo, player: currentPlayer,
      });

      // Reset Game state after a player has won
      gameState = setupGameState();
      currentPlayer = xPlayer;
      return;
    }

    currentPlayer = currentPlayer === xPlayer ? oPlayer : xPlayer;

    if (gameState.isBoardFilled()) {
      io.emit('game_tied');

      // Reset Game state after a game has tied
      gameState = setupGameState();
      currentPlayer = xPlayer;
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
