const Product = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {  type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(4,2),
    urlImage: DataTypes.STRING,

  },
  {
    timestamps: false,
    tableName: "products",
    underscored: true
  });

  return Product;
};

module.exports = Product;