var HttpError = require('./HttpError');

class NotFoundHttpError extends HttpError
{
    constructor(message = '') {
        super(404, message);
    }
}

module.exports = NotFoundHttpError;