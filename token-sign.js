const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhh';
const payload = {
  sub: 1,
  role: 'customer',
  iat: 1675107049,
  lola: 'lala'
};

function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

console.log(signToken(payload, secret));