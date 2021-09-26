const express = require('express');
const { validateProductData } = require('../middlewares/validateProduct');

const router = express.Router();
const {
  getAllProducts,
  createProduct,
  singleProduct,
  editProduct,
} = require('../controllers/productsController');

/* GET home page. */
router.get('/all', getAllProducts);
router.post('/create', validateProductData, createProduct);
router.get('/:id/edit', singleProduct);
router.put('/:id/edit', validateProductData, editProduct);

module.exports = router;
