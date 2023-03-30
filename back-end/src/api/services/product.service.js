const { Product } = require('../../database/models');
const GenericError = require('../utils/GenericError');

const productRequest = async () => {
  const allProduct = await Product.findAll();
  if (!allProduct) {
    throw new GenericError('404', 'Not Found');
  }

  return allProduct;
};

module.exports = {
  productRequest,
};
