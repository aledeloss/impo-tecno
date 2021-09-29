const { hash, unhash } = require('../utils/bcrypt');
const { createToken } = require('../services/authService');

const User = require('../models/User');

const auth = async (req, res) => {
  try {
    const { email, password: pwd } = req.body;
    const user = await User.findOne({ email });
    const isPasswordValid = unhash(pwd, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: 'Usuario o password incorrectos' });
    }

    const JWTOBject = {
      _id: user.id,
      email: user.email,
      companyName: user.companyName,
      role: user.role,
    };
    const JWT = createToken(JWTOBject);

    res.status(200).json({ message: 'Bienivenide', JWT });
    res.end();
  } catch (err) {
    console.error(err.message);
  }
};
const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email }, { password });
    if (user)
      return res.status(400).json({ message: 'El mail ya está en uso' });
    user = new User(req.body);
    user.password = hash(password);
    await user.save();
    res.sendStatus(201);
    console.log('newUser', user);
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
};

module.exports = { createUser, auth };
