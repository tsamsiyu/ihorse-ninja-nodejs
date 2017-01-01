
class BaseError extends Error
{
    constructor(message) {
        super(message);
        this.setMessage(message || 'Undefined error');
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }

    setMessage(message) {
        if (typeof message === 'string') {
            this._message = message;
        }
    }
}

module.exports = BaseError;