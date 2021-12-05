const { Schema, model } = require('mongoose');

const OrderSchema = Schema({
  code: {
    type: Number,
    required: true,
  },
  client_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'Pendiente de pago',
  },
  enabled: {
    type: Boolean,
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

module.exports = model('orders', OrderSchema);
