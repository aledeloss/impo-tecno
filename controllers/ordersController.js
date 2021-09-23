const uuid = require('uuid');
const Order = require('../models/Order');
const uuid = require('node-uuid');
const { approveOrderProducts } = require('../services/orderService');

const getAllOrders = async (_, res) => {
  try {
    const data = await Order.find();
    res.json(data);
  } catch (e) {
    console.error(e);
  }
};

const createOrder = (req, res) => {
  console.log('probando');
  console.log(req.body);
  const { clientId, items } = req.body;
  // chequear en la base que haya stock y el precio sea correcto
  // si es correcto aprueba y agrega item a la orden
  // si hay error en al menos 1 item, desaprueba
  // actualizar stock
  // generar orden
  const newOrder = new Order({
    uuid: uuid(),
    clientId,
    items,
  });
  approveOrderProducts(items);
  try {
    newOrder.save((error) => {
      if (error) {
        res.status(400).json({ error });
      }
      res.status(201).json({ message: 'Orden enviada' });
    });
  } catch (err) {
    console.error('HUBO UN ERROR', err);
    res.status(404).send('La información ingresada no es válida');
  }
};

const getSingleOrder = async (req, res) => {
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
  // TODO: sacar el ID del jwt en lugar del body pelado
  const { clientId } = req.body;
  Order.find({ client_id: clientId }, (error, data) => {
    if (error) console.error(error);
    else {
      res.json(data);
    }
  });
};

const editOrder = async (req, res) => {
  const { id } = req.params;
  const { clientId, items, date } = req.body;
  Order.findOne({ _id: id }, (err, ord) => {
    if (err) {
      console.error(err);
      return res('Device update failed', null);
    }
    // const validatedItems = validateItems(items);
    ord.client_id = clientId;
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
