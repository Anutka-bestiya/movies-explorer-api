const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');
const UnauthorizedError = require('../errors/unauthorized-err');
const {
  NOT_TOKEN,
  FAILED_TOKEN,
} = require('../utils/message');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt; // достаём токен

  function checkToken(anyToken) {
    if (!anyToken) {
      return next(new UnauthorizedError(NOT_TOKEN));
    }

    try {
      return jwt.verify(anyToken, JWT_SECRET);
    } catch (err) {
      return next(new UnauthorizedError(FAILED_TOKEN));
    }
  }

  const payload = checkToken(token);

  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
