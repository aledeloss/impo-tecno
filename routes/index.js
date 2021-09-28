const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const ordersRouter = require('./orders');
const productsRouter = require('./products');

router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/orders', ordersRouter);

module.exports = router;
