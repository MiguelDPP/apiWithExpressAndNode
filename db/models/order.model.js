const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const { CUSTOMER_TABLE } = require('./customer.model');

const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customerId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'customer_id',
    references: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
    validate: {
      async isCustomerExist(value) {
        const customer = await this.sequelize.models.Customer.findByPk(value);
        if (!customer) {
          throw new Error('Customer not found');
        }
      },
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  state: {
    type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    allowNull: false,
    defaultValue: 'pending',
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.NOW,
  },
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      if (this.products) {
        return this.products.reduce((acc, product) => acc + product.OrderProduct.amount * product.price, 0);
      }
    },
  }
};

class Order extends Model {

  static associate(models) {
    this.belongsTo(models.Customer, {
      foreignKey: 'customerId',
      as: 'customer',
    });
    this.belongsToMany(models.Product, {
      through: models.OrderProduct,
      as: 'products',
      foreignKey: 'orderId',
      otherKey: 'productId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: true,
    };
  }
}

module.exports = {
  OrderSchema,
  Order,
  ORDER_TABLE,
};

