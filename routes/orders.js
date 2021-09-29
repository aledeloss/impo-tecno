const express = require('express');
const { secureAdmin, secureClientRoutes } = require('../middlewares/auth');

const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getClientOrders,
  getSingleOrder,
  editOrder,
} = require('../controllers/ordersController');

router.post('/create', createOrder);
router.get('/all', secureAdmin, getAllOrders);
router.get('/my_orders', getClientOrders);
router.get('/:id', secureClientRoutes, getSingleOrder);
router.get('/:id/edit', secureAdmin, getSingleOrder);
router.put('/:id/edit', secureAdmin, editOrder);

module.exports = router;
