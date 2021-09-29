const express = require('express');
const router = express.Router();

const usersRouter = require('./auth');
const ordersRouter = require('./orders');
const productsRouter = require('./products');

const { securedUser } = require('../middlewares/auth');

router.use('/users', usersRouter);
router.use('/products', securedUser, productsRouter);
router.use('/orders', securedUser, ordersRouter);

module.exports = router;
