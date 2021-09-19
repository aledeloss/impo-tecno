const { Schema, model } = require('mongoose');

// revisar campos
const ProductSchema = Schema({
  category: {
    type: String,
    required: true,
  },
  trademark: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
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

module.exports = model('products', ProductSchema);
