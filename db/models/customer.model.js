const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

const CUSTOMER_TABLE = 'customers';
const { USER_TABLE } = require('./user.model');

const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name'
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'user_id',
    references: {
      model: USER_TABLE,
      key: 'id',
      // Validar que el usuario exista
    },
    unique: true,
    validate: {
      async isUnique(value) {
        const customer = await this.constructor.findOne({ where: { userId: value } });
        if (customer) {
          throw new Error('El usuario ya existe');
        }
      },
      async exists(value) {
        const user = await this.constructor.UserModel.findOne({ where: { id: value } });
        if (!user) {
          throw new Error('El usuario no existe');
        }
      }
      //  violates foreign key constraint \"customers_user_id_fkey\"",

    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.NOW
  }
}

class Customer extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });

    this.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'customerId',
    });

    this.UserModel = models.User;
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: true,
      // timezone: 'UTC-5',
    }
  }
}

module.exports = {
  CustomerSchema,
  Customer,
  CUSTOMER_TABLE,
};