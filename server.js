const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const limiter = require('./middlewares/limiter');
const routes = require('./routes/index');
const centralizedErrorHandler = require('./middlewares/centralized-error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, MONGO_URL } = require('./config');

const app = express();

// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://movie-anchikfyz.nomoredomainsrocks.ru',
  'http://movie-anchikfyz.nomoredomainsrocks.ru',
  'http://localhost:3000',
  'http://localhost:3001',
];

app.use(
  cors({
    origin: allowedCors,
    credentials: true,
  }),
);

mongoose.connect(MONGO_URL);

app.use(requestLogger); // подключаем логгер запросов
app.use(helmet());
app.use(limiter); // подключаем rate-limiter
app.use(express.json()); // для собирания JSON-формата
app.use(cookieParser()); // подключаем парсер кук как мидлвэр

// Подключение маршрутов приложения
app.use(routes); // запускаем роутинг

app.use(errorLogger); // подключаем логгер ошибок
// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(centralizedErrorHandler); // наш централизованный обработчик

app.listen(PORT);
