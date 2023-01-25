const Joi = require('joi');

const id = Joi.number().integer().positive();
const customerId = Joi.string().uuid();
const state = Joi.string().valid('pending', 'completed', 'cancelled');
const orderId = Joi.number().integer().positive();
const productId = Joi.number().integer().positive();
const amount = Joi.number().integer().min(1);

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
  state: state.default('pending'),
});

const getOrdersSchema = Joi.object({
  id: id.required(),
});

const updateOrderSchema = Joi.object({
  customerId: customerId,
  state: state,
});

const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
});

module.exports = {
  createOrderSchema,
  getOrdersSchema,
  updateOrderSchema,
  addItemSchema,
};