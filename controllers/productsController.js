const products = [
  {
    id: 1,
    title: 'teles',
  },
];

const getAllProducts = (req, res) => {
  res.json({ message: 'hola getAllProducts ' });
};

const createProduct = (req, res) => {
  res.json({ message: 'hola create' });
};

const editProduct = (req, res) => {
  res.json({ message: 'hola edit' });
};

module.exports = { getAllProducts, createProduct, editProduct };
