'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales_products', {

      saleId :{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sales',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        field: 'sale_id'
      },
      productId :{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        field: 'product_id'
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      
    });
  },

  async down (queryInterface, _Sequelize) {
   await queryInterface.dropTable('sales_products')
  }
};
