const { Strategy, ExtractJwt } = require('passport-jwt');
const { config: { jwtSecret } } = require('../../../config/config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
}

const JwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    done(null, payload);
  } catch (err) {
    done(err, false);
  }
});

module.exports = JwtStrategy;