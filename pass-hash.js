const bcrypt = require('bcrypt');

const myPassword = 'password123';

async function hashPassword(password) {
  const hash = await bcrypt.hash(password, 10);
  console.log(hash);
  return hash;
}

async function comparePassword(password, hash) {
  const result = await bcrypt.compare(password, hash);
  console.log(result);
  return result;
}

hashPassword(myPassword);
comparePassword(myPassword, '$2b$10$sg075Qbwu2jceGhtTNMtaegdFTwjxbCxNg2e0mhWN4NH/JIr0Xxpq');