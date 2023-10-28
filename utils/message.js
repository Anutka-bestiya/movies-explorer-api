const BAD_DATA = 'Переданы некорректные данные';
const NOT_FOUND_DATA = 'Объектов не найдено';
const NOT_FOUND_ID = 'Не найден объект с таким id';
const CONFLICT_EMAIL = 'Пользователь с таким email существует';
const BAD_AUTH_DATA = 'Неправильные почта или пароль';
const LOGIN = 'Авторизация прошла успешно!';
const LOGOUT = 'Выход выполнен успешно!';
const FORBIDDEN = 'Не достаточно прав для действия';
const NOT_TOKEN = 'Токен не получен из куки. Необходима авторизация';
const FAILED_TOKEN = 'Токен не прошел верификацию. Необходима авторизация';
const BAD_URL = 'Введенный URL адрес некорректный, введите корректный URL';
const BAD_EMAIL = 'Введенный email некорректный, введите корректный email';
const SERVER_ERROR = 'Произошла ошибка на сервере';
module.exports = {
  BAD_DATA,
  NOT_FOUND_DATA,
  NOT_FOUND_ID,
  CONFLICT_EMAIL,
  BAD_AUTH_DATA,
  LOGIN,
  LOGOUT,
  FORBIDDEN,
  NOT_TOKEN,
  FAILED_TOKEN,
  BAD_URL,
  BAD_EMAIL,
  SERVER_ERROR,
};
