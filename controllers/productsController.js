const Product = require('../models/Product');

const getAllProducts = async (_, res) => {
  try {
    const data = await Product.find();
    res.json(data);
  } catch (e) {
    console.error(e);
  }
};

const createProduct = (req, res) => {
  console.log(req.body);
  const { category, trademark, name, price, stock, status } = req.body;
  const newProduct = new Product({
    category,
    trademark,
    name,
    price,
    stock,
    status,
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
  const { category, trademark, name, price, stock, status } = req.body;
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
    prod.ts_update = Date.now();
    prod.save((err, prod) => {
      if (err) {
        console.error(err);
      }
      console.log('Se guardó el producto editado', prod);
      res.json(prod);
    });
  });
};

module.exports = { getAllProducts, createProduct, singleProduct, editProduct };
