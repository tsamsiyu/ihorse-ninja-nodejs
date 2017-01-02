const HttpError = require('errors/HttpError');

module.exports = HttpError.extends({
  name: 'UnprocessableEntityHttpError',
  message: 'Unprocessable entity',
  status: 415
});
