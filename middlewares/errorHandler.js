var NotFoundHttpError   = require('../errors/http/NotFoundHttpError');
var ServerHttpError     = require('../errors/http/ServerHttpError');
var HttpError           = require('../errors/http/HttpError');
var log                 = require('../libs/log');

module.exports = function (err, req, res, next) {
    if (!err) {
        err = new NotFoundHttpError();
    } else if (typeof err == 'number') {
        err = new HttpError(err);
    } else if (!(err instanceof HttpError)) {
        err = new ServerHttpError();
    }

    res.status(err.status);
    res.end(err.serialize(JSON.stringify));
};