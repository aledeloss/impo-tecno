const express = require('express');
const { validateProductData } = require('../middlewares/validateProduct');
const { secureAdmin, secureUser } = require('../middlewares/auth');

const router = express.Router();
const {
  getAllProducts,
  createProduct,
  singleProduct,
  editProduct,
} = require('../controllers/productsController');

router.get('/all', secureUser, getAllProducts);
router.post('/create', secureAdmin, validateProductData, createProduct);
router.get('/:id/edit', secureAdmin, singleProduct);
router.put('/:id/edit', secureAdmin, validateProductData, editProduct);

module.exports = router;
