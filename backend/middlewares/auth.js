const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new AuthError('Что-то пошло не так. Пожалуйста, попробуйте еще раз.'));
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'strong-secret');
  } catch (err) {
    next(new AuthError('Что-то пошло не так-2. Пожалуйста, попробуйте еще раз.'));
  }
  req.user = payload;
  next();
};
