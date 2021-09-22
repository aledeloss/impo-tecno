const { Schema, model } = require('mongoose');

// revisar campos
const OrderItemSchema = Schema({
  product: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: true,
  },
  ts_create: {
    type: Date,
    default: Date.now,
  },
  ts_update: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('orderItems', OrderItemSchema);
