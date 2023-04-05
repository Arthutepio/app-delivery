const { Sale } = require('../../database/models');
const GenericError = require('../utils/GenericError');

const findAllOrders = async (id, next) => {
  try {
    // const { id } = await User.findOne({ where: { email } });
    
    const userFindAllOrders = await Sale.findAll({ where: { userId: id } });
    
    if (!userFindAllOrders) {
      throw new GenericError('404', 'Not Found');
    }
    
    return userFindAllOrders;
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAllOrders,
};