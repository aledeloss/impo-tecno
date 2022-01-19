const uuid = require('uuid'); //
const Order = require('../models/Order');
const Product = require('../models/Product');

const newOrder = async (req) => {
  const { items } = req.body;

  const validateOrder = items.map((item) => {});
  const newOrder = new Order({
    uuid: uuid(),
    clientId: req.id,
    items,
  });
};

const approveOrderProducts = async (items) => {
  // busca en la bd la data de los productos
  const idsArray = items.map((item) => item.id);
  const productsData = await Product.find({
    _id: {
      $in: idsArray,
    },
  });
  // valida los datos ingresados
  for (let i = 0; i < productsData.length; i++) {
    const product = productsData[i];
    const item = items.find((elem) => elem.id === product.id);
    if (
      item &&
      product.stock >= item.quantity &&
      product.price === item.price
    ) {
      product.stock -= item.quantity;
      product.status = product.stock === 0 ? 'Sin stock' : product.status;
    } else {
      return 'Datos ingresados incorrectos';
    }
  }
  return productsData;
};

const calculateTotal = (items) => {
  if (items[1]) {
    return items.reduce((a, b) => a.quantity * a.price + b.quantity * b.price);
  }
  return items[0].quantity * items[0].price;
};

const updateStock = async (products) => {
  console.log('updated products', products);
  try {
    const result = products.map(({ id, quantity }) => {
      Product.updateOne(
        { _id: id },
        {
          $inc: { stock: -quantity },
        }
      );
    });
    const [updatedStock] = await Promise.all(result);
    console.log(updatedStock);
    return;
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  newOrder,
  approveOrderProducts,
  calculateTotal,
};
