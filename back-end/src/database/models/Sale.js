const Sale = (sequelize, DataTypes ) => {
  const Sale = sequelize.define('Sale', {
    id: {  type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    sellerId: { type: DataTypes.INTEGER, foreignKey: true },
    totalPrice: { type: DataTypes.DECIMAL(9,2) },
    deliveryAdress: { type: DataTypes.STRING },
    deliveryNumber: { type: DataTypes.STRING },
    saleDate: { type: DataTypes.DATE },
    status: { type: DataTypes.STRING },
  },
  {
    timestamps: false,
    tableName: "sales",
    underscored: true
  });

  Sale.associate = ({ User, SaleProduct }) => {
    Sale.belongsTo(User, { foreignKey: 'user_id', as: 'user' })
    Sale.belongsTo(User, { foreignKey: 'seller_id', as: 'seller' })
    Sale.hasMany(SaleProduct, { foreignKey: 'id', as: 'sale' })
  }
  return Sale;
};

module.exports = Sale