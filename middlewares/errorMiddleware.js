const NotFoundHttpError   = require('../errors/http/NotFoundHttpError');
const ServerHttpError     = require('../errors/http/ServerHttpError');
const HttpError           = require('../errors/HttpError');

module.exports = function (err, req, res, next) {
    console.log(err);
    if (!err) {
        err = new NotFoundHttpError();
    } else if (typeof err == 'number') {
        err = new HttpError(err);
    } else if (!(err instanceof HttpError)) {
        err = new ServerHttpError();
    }

    res.status(err.status);
    res.end();
};