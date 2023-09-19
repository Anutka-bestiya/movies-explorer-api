const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');
const UnauthorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt; // достаём токен

  function checkToken(anyToken) {
    if (!anyToken) {
      return next(new UnauthorizedError('Токен не получен из куки. Необходима авторизация'));
    }

    try {
      return jwt.verify(anyToken, JWT_SECRET);
    } catch (err) {
      return next(new UnauthorizedError('Токен не прошел верификацию. Необходима авторизация'));
    }
  }

  const payload = checkToken(token);

  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
