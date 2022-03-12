const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const { sendEmail } = require('../services/mailingService');
const {
  approveOrderProducts,
  calculateTotal,
} = require('../services/orderService');
const { newOrderEmailTemplate } = require('../utils/newOrderEmailTemplate');

const getAllOrders = async (_, res) => {
  try {
    const data = await Order.find();
    res.json(data);
  } catch (e) {
    console.error(e);
  }
};

const createOrder = async (req, res) => {
  const { items, total } = req.body;
  const clientData = await User.findById(req.id);
  // const total = calculateTotal(items);
  const ordersQuantity = await Order.find().estimatedDocumentCount();
  const newOrder = new Order({
    client_id: clientData.id,
    company_name: clientData.companyName,
    code: (ordersQuantity + 1).toString(),
    items,
    total,
  });

  const productsData = await approveOrderProducts(items);

  if (productsData === 'Datos ingresados incorrectos') {
    res.status(400).json({ message: 'Datos ingresados incorrectos' });
  }

  try {
    await Product.bulkSave(productsData);
    const registeredOrder = await newOrder.save();
    const html = newOrderEmailTemplate(newOrder);
    await sendEmail(clientData.email, html);
    res.status(201).json({ message: 'Orden creada', registeredOrder });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

const getSingleOrder = async (req, res) => {
  console.log('single order');
  try {
    const { id } = req.params;
    console.log('id', id);
    const data = await Order.findById(id);
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

// Solo permite editar el status de la orden.
const editOrder = async (req, res) => {
  const { id } = req.params;
  const { status, items, enabled } = req.body;
  Order.findOne({ _id: id }, (err, ord) => {
    if (err) {
      console.error(err);
      return res('No se pudo editar la orden', null);
    }
    ord.items = items;
    ord.status = status;
    ord.ts_update = Date.now();
    ord.enabled = enabled;
    ord.save((err, prod) => {
      if (err) {
        console.error(err);
      }
      console.log('Se guardó el producto editado', ord);
      res.status(200).json({ message: 'Orden editada', editedOrder: ord });
    });
  });
};

const cancelOrder = async (req, res) => {
  const { id } = req.params;
  const { items, status } = req.body;
  Order.findOne({ _id: id }, (err, ord) => {
    if (err) {
      console.error(err);
      return res('Device update failed', null);
    }
    ord.client_id = req.id;
    ord.items = items;
    ord.status = 'cancelada';
    ord.ts_update = Date.now();
    const editedOrder = ord.save((err, ord) => {
      if (err) {
        console.error(err);
      }
      res.json(editedOrder);
    });
  });
};

module.exports = {
  createOrder,
  getAllOrders,
  getClientOrders,
  getSingleOrder,
  editOrder,
  cancelOrder,
};
