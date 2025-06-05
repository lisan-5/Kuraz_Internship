// backend/config/auth.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES } = process.env;

module.exports = {
  signToken: (userId) => jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES
  }),
  verifyToken: (token) => jwt.verify(token, JWT_SECRET)
};