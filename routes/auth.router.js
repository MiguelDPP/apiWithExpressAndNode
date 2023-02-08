const express = require('express');
const boom = require('@hapi/boom');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { config: { jwtSecret } } = require('../config/config');
const AuthService = require('./../services/auth.service');
const router = express.Router();

const service = new AuthService();

// const clearPassword = require('../middlewares/clearPassword.handler');

router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req;
      res.status(200).json(service.signToken(user));
    } catch (err) {
      next(err);
    }
  }
  // clearPassword
);

router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await service.sendRecoveryEmail(email);
      res.status(200).json(rta);
    } catch (err) {
      next(err);
    }
  });

router.post('/change-password',
  // passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { token, password } = req.body;
      const rta = await service.changePassword(token, password);
      res.status(200).json(rta);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;