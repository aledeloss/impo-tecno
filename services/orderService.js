const uuid = require('uuid'); //
const Order = require('../models/Order');
const Product = require('../models/Product');
// const { createTicket } = require("../utils/pdfGen");

const newOrder = async (req) => {
  const { clientId, items } = req.body;

  const validateOrder = items.map((item) => {});
  const newOrder = new Order({
    uuid: uuid(),
    clientId,
    items,
  });
};

const approveOrderProducts = async (items) => {
};


const updateStock = async (products) => {
  console.log(products);
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
};
