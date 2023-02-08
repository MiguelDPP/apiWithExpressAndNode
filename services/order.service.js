const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const baseService = require('./base.service');

class OrderService extends baseService {

  constructor() {
    super(models.Order, 'Order');
  }
  // async create(data) {
  //   return data;
  // }

  async find() {
    const rta = await this.model.findAll({
      include: [{
        association: 'customer',
        // attributes: ['id', 'name', 'email'],
        include: ['user'],
      }],
    });
    return rta;
  }

  async findOne(id) {
    const rta = await this.model.findByPk(id, {
      include: [{
        association: 'customer',
        // attributes: ['id', 'name', 'email'],
        include: ['user'],
      },
        'products'],
    });
    if (!rta) {
      throw boom.notFound('Order not found');
    }
    return rta;
  }

  async addItem(data) {
    // const { orderId, productId, quantity } = data;
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async ordersByUser(userId) {
    const rta = await this.model.findAll({
      where: {
        '$customer.user_id$': userId,
      },
      include: [{
        association: 'customer',
        // attributes: ['id', 'name', 'email'],
        include: ['user'],
      },
        'products'],
    });

    return rta;
  }

  // async findOne(id) {
  //   return { id };
  // }

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

module.exports = OrderService;
