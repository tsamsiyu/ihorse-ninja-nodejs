const HttpError = require('errors/HttpError');

module.exports = HttpError.extends({
  name: 'ServerHttpError',
  message: 'Internal server error',
  status: 500
});
