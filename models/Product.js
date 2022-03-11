const { Schema, model } = require('mongoose');

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
  // updated_by: {
  //   type: String,
  //   required: true,
  // },
  ts_create: {
    type: Object,
    required: true,
  },
  ts_update: {
    type: Object,
    required: true,
  },
});

module.exports = model('products', ProductSchema);
