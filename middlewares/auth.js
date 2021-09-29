const { json } = require('express');
const { decodeToken } = require('../services/authService');
const Order = require('../models/Order');
const User = require('../models/User');

const secureUser = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { _id } = decodeToken(authorization);
    req.id = _id;
    next();
  } catch (e) {
    console.error(e);
    res.status(401).json({
      message: 'No autorizado',
      imag: 'https://http.cat/401',
    });
  }
};

const secureAdmin = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { _id, role } = decodeToken(authorization);
    if (role !== 'admin') {
      res.status(401).json({ message: 'No tenés permiso para esta ruta' });
    }
    req.id = _id;
    req.role = role;
    next();
  } catch (e) {
    console.error(e);
    res.status(401).json({
      message: 'No autorizado',
      imag: 'https://http.cat/401',
    });
  }
};

const secureClientRoutes = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    console.log('la orden es', orderId);
    const { client_id } = await Order.findById(orderId);
    console.log('el clientes es', client_id);
    console.log('el id del usuario es', req.id);
    if (client_id == req.id) {
      next();
    } else {
      const { role } = await User.findById(req.id);
      if (role === 'admin') {
        next();
      } else {
        res.status(401).json({
          message: 'No autorizado',
          imag: 'https://http.cat/401',
        });
      }
    }
  } catch (e) {
    console.error(e);
    res.status(401);
    json({
      message: 'No autorizado',
      imag: 'https://http.cat/401',
    });
  }
};

module.exports = { secureAdmin, secureUser, secureClientRoutes };
