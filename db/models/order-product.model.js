const { Model, DataTypes, Sequelize } = require('sequelize');

const { ORDER_TABLE } = require('./order.model');
const { PRODUCT_TABLE } = require('./product.model');

const ORDER_PRODUCT_TABLE = 'orders_products';

const OrderProductSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ORDER_TABLE,
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PRODUCT_TABLE,
      key: 'id',
    },
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // prices: {
  //   type: DataTypes.DECIMAL(10, 2),
  //   allowNull: false,
  // },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
};

class OrderProduct extends Model {
  static associate(models) {
    // this.belongsTo(models.Order, {
    //   foreignKey: 'orderId',
    //   as: 'order',
    // });
    // this.belongsTo(models.Product, {
    //   foreignKey: 'productId',
    //   as: 'product',
    // });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: 'OrderProduct',
      timestamps: true,
    };
  }
}

module.exports = {
  OrderProductSchema,
  OrderProduct,
  ORDER_PRODUCT_TABLE,
};