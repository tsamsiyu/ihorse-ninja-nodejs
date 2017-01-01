var BaseError = require('../BaseError');

class HttpError extends BaseError
{
    constructor(status, message = '') {
        super(message);
        this.status = status;
    }

    serialize(serializer) {
        if (this.message) {
            return serializer({
                message: this.message
            })
        } else {
            return '';
        }
    }
}

module.exports = HttpError;