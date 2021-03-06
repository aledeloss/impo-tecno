const express = require('express');
const {
  secureAdmin,
  secureUser,
  secureClientRoutes,
} = require('../middlewares/auth');
const { validateOrderData } = require('../middlewares/validations');

const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getClientOrders,
  getSingleOrder,
  editOrder,
} = require('../controllers/ordersController');

router.post('/create', secureUser, createOrder);
router.get('/all', secureAdmin, getAllOrders);
router.get('/my_orders', secureUser, getClientOrders);
router.get('/:id', secureClientRoutes, getSingleOrder);
router.get('/:id/edit', secureAdmin, getSingleOrder);
router.put('/:id/edit', secureAdmin, validateOrderData, editOrder);
router.put('/:id/edit', secureAdmin, editOrder);
// router.put('/:id/cancel', secureAdmin, cancelOrder);

module.exports = router;
