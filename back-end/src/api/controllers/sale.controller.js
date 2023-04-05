const saleService = require('../services/sales.service');

const findAllSeller = async (_req, res, next) => {
  try {
    const sellers = await saleService.findAllSeller();

    return res.status(200).json(sellers);
  } catch (error) {
    next(error);
  }
};

const createSale = async (req, res, next) => {
  try {
    const result = await saleService.createSale(req.body);
    
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await saleService.getSaleById(id);
    
    return res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAllSeller,
  createSale,
  getSaleById,
};