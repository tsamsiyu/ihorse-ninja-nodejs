var HttpError = require('./HttpError');

class ServerHttpError extends HttpError
{
    constructor(message = '') {
        super(500, message);
    }
}

module.exports = ServerHttpError;