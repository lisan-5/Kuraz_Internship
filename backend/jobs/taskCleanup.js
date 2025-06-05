const Task = require('../models/Task');
const redis = require('../config/redis');

module.exports = async () => {
  try {
    const cutoffDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    await Task.deleteMany({ 
      completed: true,
      createdAt: { $lt: cutoffDate }
    });
    await redis.flushdb();
    console.log('Completed tasks cleanup executed');
  } catch (err) {
    console.error('Cleanup job failed:', err);
  }
};
