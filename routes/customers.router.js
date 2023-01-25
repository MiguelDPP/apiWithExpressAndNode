const express = require('express');

const CustomerService = require('../services/customer.service');
const { createCustomerSchema, updateCustomerSchema, getCustomerSchema } = require('../schemas/customer.schema');
const validationHandler = require('../middlewares/validator.handler');

const router = express.Router();
const service = new CustomerService();

router.get('/', async (req, res, next) => {
  try {
    const customers = await service.find();
    res.json({
      data: customers,
      message: 'customers listed',
    });
  } catch (err) {
    next(err);
  }
});

router.post('/',
  validationHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const customer = await service.create(body);
      res.status(201).json({
        data: customer,
        message: 'customer created',
      });
    } catch (err) {
      next(err);
    }
  });

router.get('/:id',
  validationHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.findOne(id);
      res.json({
        data: customer,
        message: 'customer retrieved',
      });
    } catch (err) {
      next(err);
    }
  });

router.get('/:id/orders',
  validationHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const orders = await service.findOrders(id);
      res.json({
        data: orders,
        message: 'customer retrieved',
      });
    } catch (err) {
      next(err);
    }
  });

router.patch('/:id',
  validationHandler(getCustomerSchema, 'params'),
  validationHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const customer = await service.update(id, body);
      res.json({
        data: customer,
        message: 'customer updated',
      });
    } catch (err) {
      next(err);
    }
  });

router.delete('/:id',
  validationHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.delete(id);
      res.json({
        data: customer,
        message: 'customer deleted',
      });
    } catch (err) {
      next(err);
    }
  });

module.exports = router;