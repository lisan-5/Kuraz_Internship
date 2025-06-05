const app = require('./app');
const http = require('http');
const socketio = require('socket.io');
const redis = require('./config/redis');
const { taskCleanup } = require('./jobs/taskCleanup');

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: process.env.FRONTEND_URL
  }
});

// Attach socket to app
app.set('io', io);

// Redis-Socket bridge
redis.on('message', (channel, message) => {
  io.emit(channel, JSON.parse(message));
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // Schedule background jobs
  setInterval(taskCleanup, 24 * 60 * 60 * 1000); // Daily cleanup
});