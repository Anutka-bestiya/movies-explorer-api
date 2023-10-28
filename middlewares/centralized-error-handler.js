const { INTERNAL_SERVER_ERROR_STATUS_CODE } = require('../utils/status_code');
const { SERVER_ERROR } = require('../utils/message');

const centralizedErrorHandler = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем INTERNAL_SERVER_ERROR_STATUS_CODE
  let { statusCode } = err;
  const { message } = err;

  if (!statusCode) { statusCode = INTERNAL_SERVER_ERROR_STATUS_CODE; }

  res
    .status(statusCode)
    .send(
      { message: statusCode !== 500 ? message : SERVER_ERROR },
    );

  next();
};

module.exports = centralizedErrorHandler;
