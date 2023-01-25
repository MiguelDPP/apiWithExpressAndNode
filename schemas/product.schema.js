const Joi = require('joi');

const id = Joi.string();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10).max(100);
const image = Joi.string().uri();
const categoryId = Joi.number().integer().min(1);

const limit = Joi.number().integer().min(1);
const offset = Joi.number().integer().min(0);

const price_min = Joi.number().integer()
const price_max = Joi.number().integer()

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
  categoryId: categoryId,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit: limit,
  offset: offset,
  price: price,
  price_min: price_min,
  price_max: price_max.when('price_min', {
    is: price_min.required(),
    then: Joi.required(),
    otherwise: Joi.optional() // or Joi.forbidden()
  }),

});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema }
