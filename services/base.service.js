const boom = require('@hapi/boom');
class baseService {
  constructor(model, entity) {
    this.model = model;
    this.entity = entity;
  }

  async create(data) {
    const rta = await this.model.create(data);
    return rta;
  }

  async find() {
    // Order by primary key
    const rta = await this.model.findAll({
      order: [['id', 'ASC']],
    });
    return rta;
  }

  async findOne(id) {
    const rta = await this.model.findByPk(id);
    if (!rta) {
      throw boom.notFound(`${this.entity} not found`);
    }
    return rta;
  }

  async update(id, changes) {
    const data = await this.findOne(id);
    if (!data) {
      throw boom.notFound(`${this.entity} not found`);
    }
    const rta = await data.update(changes);
    // return rta except password
    return rta;
  }

  async delete(id) {
    const data = await this.findOne(id);
    if (!data) {
      throw boom.notFound(`${this.entity} not found`);
    }
    const rta = await data.destroy();
    return rta;
  }
  // setQuery(data) {
  //   const keys = Object.keys(data);
  //   const values = Object.values(data);
  //   const query = keys.map((key, index) => `${key} = '${values[index]}'`).join(', ');
  //   return query;
  // }

  // async update(id, changes) {

  //   const query = `UPDATE ${this.table} SET ${this.setQuery(changes)} WHERE id = '${id}'`;
  //   const rta = await this.pool.query(query);

  //   // const rta = JSON.stringify(this.setQuery(updateData));
  //   const data = await this.findOne(id);

  //   return data
  // }
}

module.exports = baseService;