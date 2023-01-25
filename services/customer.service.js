const { models } = require('../libs/sequelize');
const baseService = require('./base.service');

class CustomerService extends baseService {
  constructor() {
    super(models.Customer);
    // this.products = [];
    // this.generate();
    // this.sequelize = sequelize;
    // this.pool.on('error', (err, client) => {
    //   console.error('Unexpected error on idle client', err);
    //   // process.exit(-1);
    // });
  }

  async find() {
    const rta = await this.model.findAll({
      include: ['user']
    });
    return rta;
  }
  async findOrders(id) {
    const rta = await this.model.findByPk(id, {
      attributes: ['id'],
      include: ['orders']
    });
    if (!rta) {
      throw boom.notFound('Customer not found');
    }
    return rta.orders;
  }

  async create(data) {
    const newCustomer = await this.model.create(data, {
      include: ['user']
    });
    return newCustomer;
  }
};

module.exports = CustomerService;