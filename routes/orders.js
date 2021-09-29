const express = require('express');
const {
  secureAdmin,
  secureUser,
  secureClientRoutes,
} = require('../middlewares/auth');

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
router.put('/:id/edit', secureAdmin, editOrder);

module.exports = router;
