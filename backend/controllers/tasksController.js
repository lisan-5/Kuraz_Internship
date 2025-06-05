// controllers/tasksController.js
const TaskService = require('../services/taskService');
const CacheService = require('../services/cacheService');
const asyncHandler = require('../utils/asyncHandler');

exports.getTasks = asyncHandler(async (req, res) => {
  const cacheKey = `tasks_${JSON.stringify(req.query)}`;
  const cachedData = await CacheService.get(cacheKey);
  
  if (cachedData) {
    return res.apiSuccess(JSON.parse(cachedData));
  }

  const tasks = await TaskService.getAll(req.query);
  await CacheService.set(cacheKey, JSON.stringify(tasks), 3600); // 1 hour cache
  
  res.apiSuccess(tasks);
});