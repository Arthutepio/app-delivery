const saleService = require('../services/sales.service');

const findAllSeller = async (_req, res, next) => {
  try {
    const sellers = await saleService.findAllSeller();
  
    return res.status(200).json(sellers);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAllSeller,
};