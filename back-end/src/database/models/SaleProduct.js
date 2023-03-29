const SaleProduct = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    
    saleId: { type: DataTypes.INTEGER, foreignKey: true },
    productId: { type: DataTypes.INTEGER, foreignKey: true },
    quantity: DataTypes.INTEGER,
  },
  {
    timestamps: false,
    tableName: "sales_products",
    underscored: true
  });

  SaleProduct.associate = ({ Sale, Product }) => {
    Product.belongsToMany(Sale, {  
      foreignKey: 'saleId',  
      as: 'sales', 
      otherKey: 'productId', 
      through: SaleProduct 
    });
    Sale.belongsToMany(Product, {  
      foreignKey: 'productId',  
      as: 'products', 
      otherKey: 'saleId', 
      through: SaleProduct 
    })
  }

  return SaleProduct;
};

module.exports = SaleProduct;