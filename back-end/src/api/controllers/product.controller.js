const productService = require('../services/product.service');

const productRequest = async (_req, res, next) => {
  try {
    const allproduct = await productService.productRequest();
  
    return res.status(200).json(allproduct);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  productRequest,
};