const { INTERNAL_SERVER_ERROR_STATUS_CODE } = require('../utils/status_code');

const centralizedErrorHandler = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем INTERNAL_SERVER_ERROR_STATUS_CODE
  let { statusCode } = err;
  const { message } = err;

  if (!statusCode) { statusCode = INTERNAL_SERVER_ERROR_STATUS_CODE; }

  return res
    .status(statusCode)
    .send(
      { message: statusCode !== 500 ? message : 'Произошла ошибка на сервере' },
    );
};

module.exports = centralizedErrorHandler;
