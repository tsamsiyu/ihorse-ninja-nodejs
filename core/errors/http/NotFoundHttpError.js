const HttpError = require('errors/HttpError');

module.exports = HttpError.extends({
  name: 'NotFoundHttpError',
  message: 'Page not found',
  status: 404
});
