const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new AuthError('Что-то пошло не так. Пожалуйста, попробуйте еще раз.');
  }
  let payload;
  try {
    payload = jwt.verify(token, 'super-strong-secret', { expiresIn: '7d' });
  } catch (err) {
    throw new AuthError('Что-то пошло не так. Пожалуйста, попробуйте еще раз.');
  }
  req.user = payload;
  next();
};
