const ApiError = require('../utils/apiError');

module.exports = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new ApiError(403, 'Forbidden access'));
  }
  next();
};