const Joi = require('joi');

const { createUserSchema } = require('./user.schema');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const lastName = Joi.string().min(3).max(15);
const phone = Joi.string().min(10).max(10);

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: createUserSchema
});

const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema }
