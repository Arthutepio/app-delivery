const { User, Sale } = require('../../database/models');
const GenericError = require('../utils/GenericError');

const findAllSeller = async () => {
  const sellers = await User.findAll({
    where: { role: 'seller' },
    attributes: { exclude: ['password'] },
  });
  if (!sellers) {
    throw new GenericError('404', 'Not Found');
  }

  return sellers;
};

const findUser = async (email) => {
  const user = await User.findOne({
    where: { email },
    attributes: { exclude: ['password'] },
  });

  return user;
};

const createSale = async (body) => {
  const { email, sellerId, totalPrice, deliveryAdress, deliveryNumber } = body;
  const { id } = await findUser(email);
  const newSale = await Sale.create({
    userId: id,
    sellerId,
    totalPrice,
    deliveryAdress,
    deliveryNumber,
    saleDate: new Date(),
    status: 'Pendente',
  });
  return newSale;
};

module.exports = {
  findAllSeller,
  createSale, 
};
