const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const UserService = require('./user.service');
const { config: { jwtSecret, emailUser, emailPassword, emailHost, emailPort, emailSecure } } = require('../config/config');

const service = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized('Contraseña Incorrecta');
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    }
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: '15m',
    });
    return {
      user,
      token
    };
  }

  async sendRecoveryEmail(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const payload = {
      sub: user.id,
    };
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: '15m',
    });

    await service.update(user.id, {
      recoveryToken: token,
    });

    const link = `http://localhost:3000/recovery?token=${token}`;

    const mailOptions = {
      from: `${emailUser}`,
      to: `${email}`,
      subject: 'Correo de recuperación de contraseña',
      html: `
        <h1>Recuperación de contraseña</h1>
        <p>Para recuperar su contraseña haga click en el siguiente enlace:</p>
        <a href="${link}">Recuperar contraseña</a>
      `
    };

    const rta = await this.sendEmail(mailOptions);
    return rta;
  }

  async changePassword(token, password) {
    try {
      const payload = jwt.verify(token, jwtSecret);
      const user = await service.findOne(payload.sub);

      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }

      const newPassword = await bcrypt.hash(password, 10);

      await service.update(user.id, {
        password: newPassword,
        recoveryToken: null,
      });

      return {
        message: 'Contraseña cambiada correctamente'
      };

    } catch (err) {
      throw boom.unauthorized();
    }
  }

  async sendEmail(mailOptions) {
    const transporter = nodemailer.createTransport({
      host: emailHost,
      secure: emailSecure,
      port: emailPort,
      auth: {
        user: emailUser,
        pass: emailPassword
      }
    });

    // const mailOptions = {
    //   from: `${emailUser}`,
    //   to: `${email}`,
    //   subject: 'Sending Email using Node.js',
    //   text: 'That was easy!'
    // };

    const info = await transporter.sendMail(mailOptions);

    return {
      message: 'Email sent: ' + info.response
    }
  }
}

module.exports = AuthService;