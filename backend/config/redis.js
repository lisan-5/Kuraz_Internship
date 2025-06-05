const redis = require('redis');
const { REDIS_URL } = process.env;

const client = redis.createClient({
  url: REDIS_URL,
  retry_strategy: (options) => {
    if (options.error.code === 'ECONNREFUSED') {
      return new Error('Redis server refused connection');
    }
    return Math.min(options.attempt * 100, 5000);
  }
});

client.on('error', (err) => console.error('Redis error:', err));

module.exports = client;