// backend/services/tasks.js
const Task = require('../models/Task');
const redis = require('../config/redis');
const { publish } = require('../subscribers/tasks');

class TaskService {
  static async createTask(userId, data) {
    const task = await Task.create({ ...data, user: userId });
    await redis.del(`user:${userId}:tasks`);
    publish('task.created', task);
    return task;
  }

  static async getTasks(userId, filters = {}) {
    const cacheKey = `user:${userId}:tasks:${JSON.stringify(filters)}`;
    const cached = await redis.get(cacheKey);
    
    if (cached) return JSON.parse(cached);

    const tasks = await Task.find({ user: userId, ...filters });
    await redis.set(cacheKey, JSON.stringify(tasks), 'EX', 3600);
    return tasks;
  }
}

module.exports = TaskService;