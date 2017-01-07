const HttpError = require('errors/http-error');

module.exports = HttpError.extends({
  name: 'BadRequestHttpError',
  message: 'Bad request',
  status: 400
});
