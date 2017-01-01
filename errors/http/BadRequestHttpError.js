const HttpError = require('../HttpError');

module.exports = HttpError.extends({
    name: 'BadRequestHttpError',
    message: 'Bad request',
    status: 400
});