const HttpError = require('../HttpError');

module.exports = HttpError.extends({
    name: 'ServerHttpError',
    message: 'Internal server error',
    status: 500
});