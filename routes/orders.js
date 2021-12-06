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
  cancelOrder,
} = require('../controllers/ordersController');

// router.post('/create', secureUser, createOrder);
// router.get('/all', secureAdmin, getAllOrders);
// router.get('/my_orders', secureUser, getClientOrders);
// router.get('/:id', secureClientRoutes, getSingleOrder);
// router.get('/:id/edit', secureAdmin, getSingleOrder);
// router.put('/:id/edit', secureAdmin, validateOrderData, editOrder);
// router.put('/:id/cancel', secureAdmin, cancelOrder);

router.post('/create', createOrder);
router.get('/all', getAllOrders);
router.get('/my_orders', getClientOrders);
router.get('/:id', getSingleOrder);
router.get('/:id/edit', getSingleOrder);
router.put('/:id/edit', validateOrderData, editOrder);
router.put('/:id/cancel', cancelOrder);

module.exports = router;
