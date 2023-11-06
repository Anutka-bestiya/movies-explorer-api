const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // импортируем bcrypt
const UnauthorizedError = require('../errors/unauthorized-err');
const { BAD_AUTH_DATA, BAD_EMAIL } = require('../utils/message');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String, // строка
      required: true, // обязательное поле
      validate: {
        validator: (email) => /.+@.+\..+/.test(email),
        message: BAD_EMAIL,
      },
      unique: true,
    },
    password: {
      type: String, // строка
      required: true, // обязательное поле
      select: false, // необходимо добавить поле select чтобы API не возвращал хеш пароля
    },
    name: {
      type: String, // строка
      minlength: [2, 'Имя пользователя должно быть длиной от 2 символов'],
      maxlength: [30, 'Имя пользователя должно быть длиной до 30 символов'],
      required: true, // обязательное поле
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(BAD_AUTH_DATA));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new UnauthorizedError(BAD_AUTH_DATA));
        }

        return user; // теперь user доступен
      });
    });
};

module.exports = mongoose.model('user', userSchema);
