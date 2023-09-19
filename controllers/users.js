const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const mongoose = require('mongoose');

const { JWT_SECRET } = require('../config');
const User = require('../models/user'); // данные
const {
  OK_STATUS_CODE,
  HTTP_CREATED_STATUS_CODE,
} = require('../utils/status_code');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');

// Создание нового пользователя
function createUser(req, res, next) {
  const { email, password, name } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User
        .create({
          email,
          password: hash, // записываем хеш в базу
          name,
        })
        .then((newUser) => {
          const { _id } = newUser;

          res.status(HTTP_CREATED_STATUS_CODE).send({
            email,
            name,
            _id,
          });
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError('Пользователь с таким email существует'));
          } else if (err instanceof mongoose.Error.ValidationError) {
            next(new BadRequestError('При создании пользователя переданы некорректные данные'));
          } else { next(err); }
        });
    });
}

// Получение персональных данныех пользователя
const getUserProfile = (req, res, next) => {
  const id = req.user._id; // _id станет доступен

  User.findById(id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Не найден пользователь с таким id'));
      }
      return res.status(OK_STATUS_CODE).send(user);
    })
    .catch(next);
};

// Обновление профиля
const updateProfile = (req, res, next) => {
  const { email, name } = req.body;
  const owner = req.user._id; // _id станет доступен
  User.findByIdAndUpdate(owner, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Не найден пользователь с таким id'));
      }
      return res.status(OK_STATUS_CODE).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('При обновлении данных профиля переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      return res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true, // отправлять куки только если запрос пришел с того же домена, защита CSRF
        })
        // аутентификация успешна! пользователь в переменной user
        .send({ _id: user._id, message: 'Авторизация прошла успешно!' });
    })
    .catch(next);
};

const logout = (req, res, next) => {
  res
    .clearCookie('jwt')
    .send({ message: 'Выход выполнен успешно!' })
    .catch(next);
};

module.exports = {
  createUser,
  getUserProfile,
  updateProfile,
  login,
  logout,
};
