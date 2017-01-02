const HttpError = require('errors/HttpError');

module.exports = HttpError.extends({
  name: 'BadRequestHttpError',
  message: 'Bad request',
  status: 400
});
