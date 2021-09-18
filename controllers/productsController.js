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
  console.log(req.body);
  const { category, trademark, name, price, stock, status } = req.body;
  res.sendStatus(201).json();
  res.json({ message: 'Producto creado' });
};

const editProduct = (req, res) => {
  res.json({ message: 'hola edit' });
};

// const find = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const data = await Recipe.findById(id);
//     res.json(data);
//   } catch(e){
//     console.error(e);
//     res.sendStatus(500);
//   };
// };

module.exports = { getAllProducts, createProduct, editProduct };
