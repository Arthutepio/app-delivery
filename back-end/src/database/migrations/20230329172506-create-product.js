'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId :{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        field: 'user_id'
      },
      sellerId :{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        field: 'seller_id'
      },
      totalPrice: {
        type: Sequelize.DECIMAL(9, 2),
        allowNull: false,
        field: 'total_price'
      },
      deliveryAdress: {
        type: Sequelize.STRING(100),
        allowNull: false,
        field: 'delivery_adress'
      },
      deliveryNumber: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: 'delivery_number'
      },
      saleDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
        field: 'sale_date'
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('sales');
  }
};