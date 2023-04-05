const { Sale } = require('../../database/models');
const GenericError = require('../utils/GenericError');

const findAllOrders = async (id, next) => {
  try {
    const userFindAllOrders = await Sale.findAll({ where: { userId: id } });
    
    if (!userFindAllOrders) {
      throw new GenericError('404', 'Not Found');
    }
    
    return userFindAllOrders;
  } catch (error) {
    next(error);
  }
};

const findOneDetails = async (id) => {
  const data = await Sale.findOne({
    where: { id },
    include: [{ model: Product, as: 'products', through: { attibutes: [] } }],
  });
  return data;
};

module.exports = {
  findAllOrders,
  findOneDetails,
};