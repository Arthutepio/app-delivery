const orderService = require('../services/orders.service');

const findAllOrders = async (req, res, next) => {
  try {
    const allordersUser = await orderService.findAllOrders(req.body.email, next);

    return res.status(200).json(allordersUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAllOrders,
};