const uuid = require('uuid');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { approveOrderProducts } = require('../services/orderService');

const getAllOrders = async (_, res) => {
  try {
    const data = await Order.find();
    res.json(data);
  } catch (e) {
    console.error(e);
  }
};

const createOrder = async (req, res) => {
  const { items } = req.body;
  const newOrder = new Order({
    client_id: req.id,
    date: new Date(),
    items,
  });
  const idsArray = items.map((item) => item.id);

  const productsData = await Product.find({
    _id: {
      $in: idsArray,
    },
  });

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
      console.log('prueba ok');
    } else {
      console.log('prueba error');
      res
        .status(400)
        .json({ message: 'Datos ingresados incorrectos', product: item });
      return;
    }
  }
  try {
    await Product.bulkSave(productsData);
    await newOrder.save();
    res.status(201).json({ message: 'Orden creada', newOrder });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('id', id);
    const data = await Order.find({ id, client_id: req.id });
    res.json(data);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

const getClientOrders = async (req, res) => {
  try {
    const orders = await Order.find({ client_id: req.id });
    res.status(200).json(orders);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

const editOrder = async (req, res) => {
  const { id } = req.params;
  const { items, date } = req.body;
  Order.findOne({ _id: id }, (err, ord) => {
    if (err) {
      console.error(err);
      return res('Device update failed', null);
    }
    // const validatedItems = validateItems(items);
    ord.client_id = req.id;
    ord.items = items;
    ord.date = date;
    ord.ts_update = Date.now();
    ord.save((err, ord) => {
      if (err) {
        console.error(err);
      }
      console.log('Se guardó el producto editado', ord);
      res.json(ord);
    });
  });
};

module.exports = {
  createOrder,
  getAllOrders,
  getClientOrders,
  getSingleOrder,
  editOrder,
};
