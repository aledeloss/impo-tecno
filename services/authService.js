const jwt = require('jsonwebtoken');

const signOptions = { expiresIn: '7 days', algorithm: 'RS256' };

const createToken = (payload) => {
  return jwt.sign(payload, process.env.PRIVATE_KEY, signOptions);
};
const decodeToken = (token) => {
  return jwt.verify(token, process.env.PRIVATE_KEY);
};

module.exports = { createToken, decodeToken };
