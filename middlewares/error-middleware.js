const NotFoundHttpError = require('errors/http/not-found-http-error');
const ServerHttpError = require('errors/http/server-http-error');
const HttpError = require('errors/http-error');

module.exports = function (err, req, res, next) {
  if (!err) {
    err = new NotFoundHttpError();
  } else if (typeof err == 'number') {
    err = new HttpError(err);
  } else if (!(err instanceof HttpError)) {
    err = new ServerHttpError();
  }

  res.status(err.status);
  res.json(err.serialize());
};
