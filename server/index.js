const cors = require('cors');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const { clientUrl, port } = require('./env');

const app = express();
app.use(cors);

const server = http.createServer(app);

// Socket Server
const io = new Server(server, {
  cors: {
    origin: clientUrl,
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('place_marker', ({ currentPlayer, gameState, position, }) => {
    // Server Emits to every connected client
    io.emit('marker_placed', {
      currentPlayer,
      gameState,
      position,
      success: 200,
    });
  });
});

server.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
