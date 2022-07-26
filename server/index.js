const cors = require('cors');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const { clientUrl, port } = require('./env');
const { oPlayer, xPlayer } = require('../shared/constants');
const { setupGameState } = require('../shared/game');

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
const gameState = setupGameState();

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('place_marker', ({ position }) => {
    gameState.setCell(position, currentPlayer.marker);

    // Server Emits to every connected client
    io.emit('marker_placed', {
      currentPlayer,
      gameState: {
        cells: gameState.cells,
        canComputeWinner: gameState.canComputeWinner,
        isBoardFilled: gameState.isBoardFilled,
      },
      position,
      success: 200,
    });
    currentPlayer = currentPlayer === xPlayer ? oPlayer : xPlayer;

    if (false) {
      io.emit('game_won', {
        winCombo, player
      });
      return;
    }

    if (false) {
      io.emit('game_tied');
    }

  });
});

server.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
