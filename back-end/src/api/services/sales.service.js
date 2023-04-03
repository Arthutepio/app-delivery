const { User } = require('../../database/models');
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

module.exports = {
  findAllSeller,
};
