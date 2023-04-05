const orderService = require('../services/orders.service');

const findAllOrders = async (req, res, next) => {
  try {
    const allordersUser = await orderService.findAllOrders(req.params.id, next);

    return res.status(200).json(allordersUser);
  } catch (error) {
    next(error);
  }
};

const findOneDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const detailsOrder = await orderService.findOneDetails(id);
    return res.status(200).json(detailsOrder);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAllOrders,
  findOneDetails,
};