const BaseError = require('errors/base-error');
const stackTrace = require('stack-trace');

module.exports = BaseError.extends({
  name: 'HttpError',
  message: 'Http error',
  serialize: function () {
    const app = require('app');
    let serialized = {message: this.message};
    if (app.get('config').get('debug')) {
      serialized.stack = stackTrace.parse(this);
    }
    return serialized;
  }
}, function (status, message = null) {
  this.setIfPresent('status', status);
  this.super(message);
});
