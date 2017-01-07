const BaseError = require('errors/base-error');

module.exports = BaseError.extends({
  name: 'HttpError',
  message: 'Http error',
  serialize: function () {
    return {
      message: this.message,
      stack: this.stack
    };
  }
}, function (status, message = null) {
  this.setIfPresent('status', status);
  this.super(message);
});
