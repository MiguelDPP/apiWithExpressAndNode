// const boom = require('@hapi/boom');

// const pool = require('../libs/postgres.pool');
const baseService = require('./base.service');
const { models } = require('../libs/sequelize');

class UserService extends baseService {
  constructor() {
    super(models.User, 'User');
  }

  async find() {
    const rta = await this.model.findAll({
      include: ['customer']
    });
    return rta;
  }

  // async findOne(id) {

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

module.exports = UserService;
