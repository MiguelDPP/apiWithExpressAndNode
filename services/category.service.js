const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');
const baseService = require('./base.service');

class CategoryService extends baseService {
  constructor() {
    super(models.Category, 'Category');
  }
  // async create(data) {
  //   return data;
  // }

  async find() {
    const categories = await this.model.findAll();
    return categories;
  }

  async findOne(id) {
    const category = await this.model.findByPk(id, {
      include: ['products']
    });

    if (!category) {
      throw boom.notFound('Category not found');
    }
    return category;
  }

  // async update(id, changes) {
  //   return {
  //     id,
  //     changes,
  //   };
  // }

  // async delete(id) {
  //   return { id };
  // }

}

module.exports = CategoryService;
