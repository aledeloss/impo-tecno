const { Schema, model } = require('mongoose');

// revisar campos
const OrderSchema = Schema({
  uuid: {
    type: String,
    required: true,
  },
  client_id: {
    type: String,
    required: true,
    // TODO vincular con user
    // type: Schema.Types.ObjectId,
    // ref: 'User',
    // required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
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
