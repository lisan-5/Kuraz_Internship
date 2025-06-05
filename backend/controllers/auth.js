const User = require('../models/User');
const { signToken } = require('../config/auth');
const ApiError = require('../utils/apiError');

exports.register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const token = signToken(user._id);
    res.status(201).json({ token });
  } catch (err) {
    next(new ApiError(400, 'Registration failed'));
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select('+password');
    if (!user || !(await user.comparePassword(req.body.password))) {
      throw new Error();
    }
    const token = signToken(user._id);
    res.json({ token });
  } catch (err) {
    next(new ApiError(401, 'Invalid credentials'));
  }
};