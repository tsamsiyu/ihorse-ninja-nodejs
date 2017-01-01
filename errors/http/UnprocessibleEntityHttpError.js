var HttpError = require('./HttpError');

class UnprocessibleEntityHttpError extends HttpError
{
    constructor(errors, message = '') {
        super(422, message);
        this.errors = errors;
    }

    serialize(serializer) {
        if (typeof this.errors === 'object' && this.errors) {
            return serializer(this.errors);
        } else {
            if (this.message) {
                return serializer({
                    message: this.message
                });
            } else {
                return '';
            }
        }
    }
}

module.exports = UnprocessibleEntityHttpError;