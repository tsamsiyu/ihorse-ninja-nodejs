var HttpError = require('./HttpError');

class BadRequestHttpError extends HttpError
{
    constructor(message = '') {
        super(400, message);
    }
}

module.exports = BadRequestHttpError;