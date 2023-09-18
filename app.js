/* eslint-disable no-console */
// const path = require("path");
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
require('dotenv').config();
const cors = require('cors');
const limiter = require('./middlewares/limiter');
const routes = require('./routes/index');
const centralizedErrorHandler = require('./middlewares/centralized-error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  // 'https://mesto-anchikfyz.nomoredomainsicu.ru',
  // 'http://mesto-anchikfyz.nomoredomainsicu.ru',
  // 'https://api.mesto-anchikfyz.nomoredomainsicu.ru',
  // 'http://api.mesto-anchikfyz.nomoredomainsicu.ru',
  'http://localhost:3000',
];

app.use(cors({
  origin: allowedCors,
  credentials: true,
}));

app.use(helmet());
app.use(limiter); // подключаем rate-limiter
app.use(express.json()); // для собирания JSON-формата
app.use(cookieParser()); // подключаем парсер кук как мидлвэр

// app.use(express.static(path.join(__dirname, "public")));

app.use(requestLogger); // подключаем логгер запросов
// Подключение маршрутов приложения
app.use(routes); // запускаем роутинг

app.use(errorLogger); // подключаем логгер ошибок
// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(centralizedErrorHandler); // наш централизованный обработчик

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('БД подключена'))
  .catch(() => console.log('не удалось подключиться к БД'));

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log('App listening on port ', PORT);
});
