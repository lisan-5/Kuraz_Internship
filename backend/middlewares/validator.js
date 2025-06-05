const { validationResult } = require('express-validator');

module.exports = (validations) => async (req, res, next) => {
  await Promise.all(validations.map(validation => validation.run(req)));
  
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const formattedErrors = errors.array().map(err => ({
    field: err.param,
    message: err.msg
  }));

  res.status(400).json({ errors: formattedErrors });
};