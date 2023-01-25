const { models } = require('../libs/sequelize');
const baseService = require('./base.service');
const boom = require('@hapi/boom');
const { Op } = require('sequelize');

class ProductsService extends baseService {

  constructor() {
    super(models.Product);
    // this.products = [];
    // this.generate();
    // this.sequelize = sequelize;
    // this.pool.on('error', (err, client) => {
    //   console.error('Unexpected error on idle client', err);
    //   // process.exit(-1);
    // });
  }


  // async create(data) {
  //   const newProduct = {
  //     id: faker.datatype.uuid(),
  //     ...data
  //   }
  //   this.products.push(newProduct);
  //   return newProduct;
  // }

  async find(query) {
    const options = {
      include: ['category'],
      where: {}
    };
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    const { price } = query;
    if (price) {
      options.where.price = price;
    }

    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.between]: [price_min, price_max]
      };
    }

    // const query = 'SELECT * FROM tasks';
    // const rta = await this.pool.query(query);
    // return rta.rows;

    const rta = await this.model.findAll(options);
    return rta;
  }

  async findOne(id) {
    const rta = await this.model.findByPk(id, {
      include: ['category']
    });
    if (!rta) {
      throw boom.notFound('product not found');
    }
    return rta;
  }

  // async findOne(id) {
  //   // const product = this.products.find(item => item.id === id);
  //   // if (!product) {
  //   //   throw boom.notFound('product not found');
  //   // }
  //   // if (product.isBlock) {
  //   //   throw boom.conflict('product is block');
  //   // }
  //   // return product;
  //   const query = `SELECT * FROM tasks WHERE id = '${id}'`;
  //   const rta = await this.sequelize.query(query);
  //   if (rta.length === 0) {
  //     throw boom.notFound('product not found');
  //   }
  //   return rta[0];
  // }

  // async update(id, changes) {
  //   const index = this.products.findIndex(item => item.id === id);
  //   if (index === -1) {
  //     throw boom.notFound('product not found');
  //   }
  //   const product = this.products[index];
  //   this.products[index] = {
  //     ...product,
  //     ...changes
  //   };
  //   return this.products[index];
  // }

  // async delete(id) {
  //   const index = this.products.findIndex(item => item.id === id);
  //   if (index === -1) {
  //     throw boom.notFound('product not found');
  //   }
  //   this.products.splice(index, 1);
  //   return { id };
  // }

}

module.exports = ProductsService;
