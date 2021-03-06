const {
  productValidationSchema,
  orderValidationSchema,
} = require('../helpers/validationSchema');

const validateProductData = async (req, res, next) => {
  const { error } = productValidationSchema.validate(req.body);
  console.info(error);
  error ? res.status(422).json({ message: error.details[0].message }) : next();
};

const validateOrderData = async (req, res, next) => {
  const { error } = orderValidationSchema.validate(req.body);
  console.info(error);
  error ? res.status(422).json({ message: error.details[0].message }) : next();
};

module.exports = { validateProductData, validateOrderData };
