const { User, Sale, SaleProduct, Product } = require('../../database/models');

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

const createSaleProducts = async (saleId, products) => {
  await Promise.all(
    products.map(async ({ id, quantity }) =>
      SaleProduct.create({ saleId, productId: id, quantity })),
  );
};

const createSale = async (body) => {
  const { email, sellerId, totalPrice, deliveryAddress, deliveryNumber, products } = body;
  const { id: userId } = await findUser(email);
  const { id } = await Sale.create({
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate: new Date(),
    status: 'Pendente',
  });

  await createSaleProducts(id, products);
  return id;
};

const getSaleById = async (sellerId) => {
  const dataSales = await Sale.findAll({
    where: { sellerId },
    include: [{ model: Product, as: 'products', through: { attibutes: [] } }],
  });

  return dataSales;
};

const updateStatus = async (saleId, status) => {
  try {
    await Sale.update(
      { status },
      { where: { id: saleId } },
    );
    
    return status;
  } catch (err) {
    return err;
  }
};

module.exports = {
  findAllSeller,
  createSale,
  getSaleById,
  updateStatus,
};
