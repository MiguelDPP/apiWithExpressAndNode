function clearPassword(req, res, next) {
  // delete req.user.dataValues.password;
  if (req.user.length) {
    req.user.forEach((user) => {
      delete user.dataValues.password;
    });
  } else {
    delete req.user.dataValues.password;
  }
  res.json({
    data: req.user,
    message: 'login success',
  });
}

module.exports = clearPassword;