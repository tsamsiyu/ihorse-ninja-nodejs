const HttpError = require('errors/http-error');

module.exports = HttpError.extends({
  name: 'UnprocessableEntityHttpError',
  message: 'Unprocessable entity',
  status: 415
});
