// app.js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Serve static files (optional)
app.use(express.static('public'));

// Set up routes (optional)
app.get('/', (req, res) => {
  res.sendFile(__dirname + 'public/index.html');
});

// Set up Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle incoming messages
  socket.on('chat message', (message) => {
    console.log('Received message:', message);
    io.emit('chat message', message); // Broadcast the message to all connected clients
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
