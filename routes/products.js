const express = require('express');

const router = express.Router();
const {
  getAllProducts,
  createProduct,
  singleProduct,
  editProduct,
} = require('../controllers/productsController');

/* GET home page. */
router.get('/all', getAllProducts);
router.post('/create', createProduct);
router.get('/:id/edit', singleProduct);
router.put('/:id/edit', editProduct);

module.exports = router;
