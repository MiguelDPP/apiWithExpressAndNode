const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  // logging: console.log, // set to console.log to see the raw SQL queries
  logging: false, // set to console.log to see the raw SQL queries
  // if you want to change time zone to UTC -5
  timezone: 'UTC',
  dialectOptions: {
    // if you want to change time zone to UTC
    timezone: 'UTC',
  },
});

setupModels(sequelize);
// Crear tablas
// sequelize.sync();

module.exports = sequelize;