const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhh';
function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

console.log(verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY3NTEwNzA0OSwibG9sYSI6ImxhbGEifQ.GUjH5-Hc-CzTuOM6jFwDVZGHdkNzVOOPLspdstr9jpE', secret));