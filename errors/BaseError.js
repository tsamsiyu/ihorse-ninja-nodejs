const error = require('./index');

module.exports = error({
    name: 'BaseError',
    message: 'Undefined error'
}, function(message) {
    this.setIfPresent('message', message);
});