const { Client } = require('pg');

async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'miguecode',
    password: '123456',
    database: 'store',
  });

  await client.connect();
  return client;
}

module.exports = getConnection;