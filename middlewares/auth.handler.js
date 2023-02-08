const boom = require('@hapi/boom');
const { config } = require('../config/config');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api-key'];
  if (!apiKey || apiKey !== config.apiKey) {
    next(boom.unauthorized('Invalid API Key'));
  } else {
    next();
  }
}

function checkAdminRole(req, res, next) {
  const { user } = req;
  if (!user || (user && user.role !== 'Admin')) {
    next(boom.forbidden('You are not authorized to access this resource'));
  } else {
    next();
  }
}

function checkRoles(...roles) {
  return function (req, res, next) {
    const { user } = req;
    if (!user || (user && !roles.includes(user.role))) {
      next(boom.forbidden('You are not authorized to access this resource'));
    } else {
      next();
    }
  }
}

module.exports = {
  checkApiKey,
  checkRoles,
}