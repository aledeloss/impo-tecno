const express = require('express');
const router = express.Router();

const usersRouter = require('./auth');
const ordersRouter = require('./orders');
const productsRouter = require('./products');

const { secureUser } = require('../middlewares/auth');

router.use('/users', usersRouter);
// router.use('/products', secureUser, productsRouter);
// router.use('/orders', secureUser, ordersRouter);
router.use('/products', productsRouter);
router.use('/orders', ordersRouter);

module.exports = router;
