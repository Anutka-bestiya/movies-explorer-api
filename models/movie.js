const mongoose = require('mongoose');
const { LINK_REGEX } = require('../utils/regex');

const movieSchema = new mongoose.Schema({
  country: {
    type: String, // строка
    required: true, // обязательное поле
  }, // страна создания фильма
  director: {
    type: String, // строка
    required: true, // обязательное поле
  }, // режиссёр фильма
  duration: {
    type: Number, // число
    required: true, // обязательное поле
  }, // длительность фильма
  year: {
    type: String, // строка
    required: true, // обязательное поле
  }, // год выпуска фильма.
  description: {
    type: String, // строка
    required: true, // обязательное поле
  }, // описание фильма
  image: {
    type: String, // строка
    required: true, // обязательное поле
    validate: {
      validator: (url) => LINK_REGEX.test(url),
      message:
        'Введенный URL адрес некорректный, введите корректный URL',
    },
  }, // ссылка на постер к фильму. Запишите её URL-адресом.
  trailerLink: {
    type: String, // строка
    required: true, // обязательное поле
    validate: {
      validator: (url) => LINK_REGEX.test(url),
      message:
        'Введенный URL адрес некорректный, введите корректный URL',
    },
  }, // ссылка на трейлер фильма. Запишите её URL-адресом.
  thumbnail: {
    type: String, // строка
    required: true, // обязательное поле
    validate: {
      validator: (url) => LINK_REGEX.test(url),
      message:
        'Введенный URL адрес некорректный, введите корректный URL',
    },
  }, // миниатюрное изображение постера к фильму. Запишите её URL-адресом.
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true, // обязательное поле
  }, // _id пользователя, который сохранил фильм.
  movieId: {
    type: Number, // число
    required: true, // обязательное поле
  }, // id фильма, который содержится в ответе сервиса MoviesExplorer.
  nameRU: {
    type: String, // строка
    required: true, // обязательное поле
  }, // название фильма на русском языке.
  nameEN: {
    type: String, // строка
    required: true, // обязательное поле
  }, // название фильма на английском языке
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
