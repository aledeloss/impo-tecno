const express = require('express');

const router = express.Router();
const {
  getAllProducts,
  createProduct,
  editProduct,
} = require('../controllers/productsController');

/* GET home page. */
router.get('/all', getAllProducts);
router.post('/create', createProduct);
router.put('/:product/edit', editProduct);

module.exports = router;
