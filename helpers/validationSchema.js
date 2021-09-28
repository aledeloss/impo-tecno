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
    .valid('En stock', 'Sin stock', 'Preventa', 'No disponible') // Consultar por No disponible
    .required(),
  stock: Joi.number().integer().min(0).required(), // uno de los campos
  enabled: Joi.bool(),
});

const orderValidationSchema = Joi.object({
  // category: Joi.string().valid('').required(), // uno de los campos
  // trademark: Joi.string().required(), //
  // name: Joi.string().required(),
  // price: Joi.number().required(), // dos decimales y positivo
  // status: Joi.string()
  //   .valid('En stock', 'Sin stock', 'Preventa', 'No disponible')
  //   .required(),
  // stock: Joi.number().integer().min(0).required(), // uno de los campos
  // enabled: Joi.bool(),
});

module.exports = {
  productValidationSchema,
  orderValidationSchema,
};
