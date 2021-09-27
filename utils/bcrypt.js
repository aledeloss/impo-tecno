const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(5);

const hash = (payload) => {
  return bcrypt.hashSync(payload, salt);
};
const unhash = (payload, hashedPayload) => {
  return bcrypt.compareSync(payload, hashedPayload);
};

module.exports = { hash, unhash };
