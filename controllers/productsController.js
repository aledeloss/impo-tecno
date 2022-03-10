const Product = require('../models/Product');
const { productValidationSchema } = require('../helpers/validationSchema');

const getAllProducts = async (_, res) => {
  try {
    const data = await Product.find();
    res.json(data);
  } catch (e) {
    console.error(e);
  }
};

const createProduct = (req, res) => {
  const {
    category, trademark, name, price, stock, status, current_time,
  } = req.body;
  const newProduct = new Product({
    category,
    trademark,
    name,
    price,
    stock,
    status,
    ts_create: current_time,
    ts_update: current_time,
  });
  try {
    newProduct.save((error) => {
      if (error) {
        res
          .status(400)
          .json({ message: 'La información ingresada no es válida' });
      }
      res.status(201).json({ message: 'Producto creado' });
    });
  } catch (err) {
    console.error('HUBO UN ERROR', err);
    res.status(404).send('La información ingresada no es válida');
  }
};

const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('id', id);
    const data = await Product.findById(id);
    res.json(data);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const {
    category, trademark, name, price, stock, status, current_time,
  } = req.body;
  let enabled = true;
  if (req.body.enabled) {
    enabled = false;
  }
  Product.findOne({ _id: id }, (err, prod) => {
    if (err) {
      console.error(err);
      return res('Device update failed', null);
    }
    prod.category = category;
    prod.trademark = trademark;
    prod.name = name;
    prod.price = price;
    prod.stock = stock;
    prod.status = status;
    prod.ts_update = current_time;
    prod.enabled = enabled;
    prod.save((err, prod) => {
      if (err) {
        console.error(err);
      }
      console.log('Se guardó el producto editado', prod);
      res.json(prod);
    });
  });
};

const updateStatus = async (id) => {};

module.exports = {
  getAllProducts,
  createProduct,
  singleProduct,
  editProduct,
};
