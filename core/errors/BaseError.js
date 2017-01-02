const error = require('errors');

module.exports = error({
  name: 'BaseError',
  message: 'Undefined error'
}, function (message) {
  this.setIfPresent('message', message);
});
