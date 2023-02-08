// const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');

// const pool = require('../libs/postgres.pool');
const baseService = require('./base.service');
const { models } = require('../libs/sequelize');

class UserService extends baseService {
  constructor() {
    super(models.User, 'User');
  }

  async find() {
    const rta = await this.model.findAll({
      include: ['customer'],
      // Exclude password from response
      attributes: { exclude: ['password'] },
    });
    return rta;
  }

  async findOne(id) {
    const rta = await this.model.findByPk(id, {
      include: ['customer'],
      // Exclude password from response
      attributes: { exclude: ['password'] },
    });
    return rta;
  }

  async findByEmail(email) {
    const rta = await this.model.findOne({
      where: { email },
    });
    return rta;
  }

  async validatePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  // async create(data) {
  //   const { password } = data;
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const rta = await this.model.create({
  //     ...data,
  //     password: hashedPassword,
  //   });
  //   // Excluir el password de la respuesta
  //   delete rta.dataValues.password;
  //   return rta;
  // }

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
