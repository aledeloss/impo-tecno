const express = require('express');

const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getClientOrders,
  getSingleOrder,
  editOrder,
} = require('../controllers/ordersController');

router.post('/create', createOrder);
router.get('/all', getAllOrders);
router.get('/my_orders', getClientOrders);
router.get('/:id', getSingleOrder);
router.get('/:id/edit', getSingleOrder);
router.put('/:id/edit', editOrder);

module.exports = router;
