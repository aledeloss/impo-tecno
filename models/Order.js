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
  company_name: {
    type: String,
    required: false,
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
    default: 'pago pendiente',
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  ts_create: {
    type: String,
    required: true,
  },
  ts_update: {
    type: String,
    required: true,
  },
});

module.exports = model('orders', OrderSchema);
