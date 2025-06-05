// backend/subscribers/tasks.js
const redis = require('../config/redis');
const io = require('../server').io;

redis.subscribe('task.*', (err, count) => {
  if (err) console.error('Subscription error:', err);
});

redis.on('message', (channel, message) => {
  const event = channel.split('.')[1];
  const data = JSON.parse(message);
  
  switch(event) {
    case 'created':
      io.emit('TASK_CREATED', data);
      break;
    case 'updated':
      io.emit('TASK_UPDATED', data);
      break;
  }
});

module.exports = {
  publish: (event, data) => redis.publish(`task.${event}`, JSON.stringify(data))
};