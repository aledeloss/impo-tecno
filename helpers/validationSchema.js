const Joi = require('@hapi/joi');

const productValidationSchema = Joi.object({
  category: Joi.string()
    .valid(
      'Motherboard',
      'Refrigeración',
      'Microprocesadores',
      'Fuentes de alimentación',
      'Adaptadores',
      'Cables',
      'Memoria RAM',
      'Monitores',
      'Placas de video',
      'Discos de almacenamiento',
      'Accesorios',
      'Estructuras'
    )
    .required(),
  trademark: Joi.string().required(), //
  name: Joi.string().required(),
  price: Joi.number().required(), // dos decimales y positivo
  status: Joi.string()
    .valid('en stock', 'sin stock', 'preventa', 'no disponible') // Consultar por No disponible
    .required(),
  stock: Joi.number().integer().min(0).required(), // uno de los campos
  enabled: Joi.bool(),
});

const orderValidationSchema = Joi.object({
  client_id: Joi.string().required(),
  items: Joi.array().required(),
  date: Joi.date(),
  status: Joi.string()
    .valid('pendiente de pago', 'en camino', 'cancelado', 'entregado')
    .required(),
  enabled: Joi.boolean().required(),
});

module.exports = {
  productValidationSchema,
  orderValidationSchema,
};
