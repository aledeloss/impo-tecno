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
  const { items, client } = req.body;
  const newOrder = new Order({
    client_id: client,
    date: new Date(),
    items,
  });
  await Promise.all(
    items.map(async (item) => {
      // valida que haya stock y el precio sea correcto
      await Product.findById(item.id, function (err, data) {
        if (data.stock >= item.quantity && data.price === item.price) {
          console.log('ok');
        } else {
          res
            .status(400)
            .json({ message: 'Datos ingresados incorrectos', product: item });
          return;
        }
      });
    })
  )
    .then(
      // actualiza stock
      Promise.all(
        items.map(async (item) => {
          Product.findById(item.id, function (err, data) {
            if (err) console.error(err);
            else {
              Product.findByIdAndUpdate(
                item.id,
                {
                  stock: data.stock - item.quantity,
                  //status: newStock === 0 ? 'Sin stock' : 'En stock', // arreglar esto
                },
                function (err, data) {
                  console.log('updated');
                }
              );
            }
          });
        })
      )
    )
    .then(
      //crea la orden
      // try {
      newOrder.save((error) => {
        if (error) {
          res.status(400).json({ message: error.message });
        }
        res.status(201).json({ message: 'Orden creada' });
      })
      // } catch (err) {
      //   console.error('HUBO UN ERROR', err);
      //   res.status(404).send('La información ingresada no es válida');
      // }
    )
    .then(res.status(200));
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
