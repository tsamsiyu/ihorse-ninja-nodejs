const HttpError = require('errors/http-error');

module.exports = HttpError.extends({
  name: 'NotFoundHttpError',
  message: 'Page not found',
  status: 404
});
