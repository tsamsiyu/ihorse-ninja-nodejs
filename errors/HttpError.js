const BaseError = require('./BaseError');

module.exports = BaseError.extends({
    name: 'HttpError',
    message: 'Http error'
}, function(status, message = null) {
    this.setIfPresent('status', status);
    this.super(message);
});