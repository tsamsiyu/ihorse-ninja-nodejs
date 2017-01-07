const HttpError = require('errors/http-error');

module.exports = HttpError.extends({
  name: 'ServerHttpError',
  message: 'Internal server error',
  status: 500
});
