const cors = require('cors');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const { clientUrl, port } = require('./env');

const app = express();
app.use(cors);

const server = http.createServer(app);

const oPlayer = Object.freeze({
  marker: 'o',
  struct: '<div class="marker o-marker"></div>',
  name: 'Pink',
});

const xPlayer = Object.freeze({
  marker: 'x',
  struct: '<div class="marker x-marker"></div>',
  name: 'Blue',
});

const setupGameState = (rowSize = 3) => {
  const boardSize = rowSize ** 2;
  const gs = Array(boardSize).fill(null);
  const minCellsToFill = rowSize * 2 - 1;
  let cellsFilledCount = 0;

  return Object.freeze({
    cells: gs,
    setCell: (i, v) => {
      gs[i] = v;
      cellsFilledCount += 1;
    },
    canComputeWinner: cellsFilledCount >= minCellsToFill,
    isBoardFilled: cellsFilledCount === boardSize,
  });
};

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
  });
});

server.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
