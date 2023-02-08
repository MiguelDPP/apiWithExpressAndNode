const express = require('express');

const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');
const orderRouter = require('./orders.router');
const CustomerRouter = require('./customers.router');
const authRouter = require('./auth.router');
const profilesRouter = require('./profiles.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  router.use('/orders', orderRouter);
  router.use('/customers', CustomerRouter);
  router.use('/profile', profilesRouter);
  router.use(authRouter);
}

module.exports = routerApi;
