const Joi = require('@hapi/joi');

const productValidationSchema = Joi.object({
  category: Joi.string()
    .valid(
      'Adaptadores',
      'ASIC',
      'Auriculares',
      'Cables',
      'Combo',
      'Cooler',
      'Discos HDD',
      'Discos SDD',
      'Estructuras RIG',
      'Fuentes',
      'Gabinete',
      'Memoria RAM',
      'Micrófono',
      'Microprocesador',
      'Monitor',
      'Motherboard',
      'Mouse',
      'Mousepad',
      'Parlantes',
      'Placas de Video',
      'Powerbank',
      'Refrigeración',
      'RIG armado',
      'Silla Gamer',
      'Soporte para TV',
      'Teclado',
      'Webcam'
    )
    .required(),
  trademark: Joi.string().required(), //
  name: Joi.string().required(),
  price: Joi.number().required(), // dos decimales y positivo
  status: Joi.string()
    .valid('en stock', 'sin stock', 'preventa', 'en tránsito') // 'no disponible')
    .required(),
  stock: Joi.number().integer().min(0).required(), // uno de los campos
  enabled: Joi.bool(),
});

const orderValidationSchema = Joi.object({
  client_id: Joi.string().required(),
  items: Joi.array().required(),
  date: Joi.date(),
  status: Joi.string()
    .valid(
      'pago pendiente',
      'en tránsito',
      'entregado',
      'listo para envío',
      'cancelado',
      'entregado'
    )
    .required(),
  enabled: Joi.boolean().required(),
});

module.exports = {
  productValidationSchema,
  orderValidationSchema,
};
