const express = require('express');
const { validateProductData } = require('../middlewares/validations');
const { secureAdmin, secureUser } = require('../middlewares/auth');

const router = express.Router();
const {
  getAllProducts,
  createProduct,
  singleProduct,
  editProduct,
} = require('../controllers/productsController');

// router.get('/all', secureUser, getAllProducts);
// router.post('/create', secureAdmin, validateProductData, createProduct);
// router.get('/:id/edit', secureAdmin, singleProduct);
// router.put('/:id/edit', secureAdmin, validateProductData, editProduct);

router.get('/all', getAllProducts);
router.post('/create', validateProductData, createProduct);
router.get('/:id/edit', singleProduct);
router.put('/:id/edit', validateProductData, editProduct);

module.exports = router;
