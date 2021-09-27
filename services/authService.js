const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync('./keys/private.pem');
const publicKey = fs.readFileSync('./keys/public.pem');

const signOptions = { expiresIn: '7 days' };

const createToken = (payload) => {
  return jwt.sign(payload, privateKey, signOptions);
};
const decodeToken = (token) => {
  return jwt.verify(token, publicKey);
};

module.exports = { createToken, decodeToken };
