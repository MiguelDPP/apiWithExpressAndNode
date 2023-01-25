const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
    // Respuesta si el email ya existe
    validate: {
      isEmail: {
        msg: 'Email invalido'
      },
      async isUnique(value) {
        const user = await this.constructor.findOne({ where: { email: value } });
        if (user) {
          throw new Error('El email ya existe');
        }
      }
    }

  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
    // validate: {
    //   len: {
    //     args: [10, 20],
    //     msg: 'La contraseña debe tener entre 6 y 20 caracteres'
    //   }
    // }
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer'
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
    // UPDATE TO UTC
    // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP AT TIME ZONE \'UTC\'')
  },
};

class User extends Model {
  static associate(models) {
    // define association here
    this.hasOne(models.Customer, {
      foreignKey: 'user_id',
      as: 'customer',
    });
  }
  // Conection with sequelize
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: true, // true by default
      // Cambiar zona horaria
      timezone: 'UTC-5',


      // If you don't want createdAt
      // createdAt: false,
      // If you don't want updatedAt
      // updatedAt: false,

      // If you want to disable both
      // timestamps: false,

      // If you want to override the column names
      // createdAt: 'creation_date',
      // updatedAt: 'updated_date',

      // If you want to disable the modification of tablenames; By default, sequelize will automatically
      // transform all passed model names (first parameter of define) into plural.
      // If you don't want that, set the following
      // freezeTableName: true,




    }
  }
}

module.exports = {
  UserSchema,
  User,
  USER_TABLE,
};