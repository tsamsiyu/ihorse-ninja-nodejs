var validate = require('validate.js');

validate.async.options = {
  cleanAttributes: false
};

validate.extend(validate.validators.datetime, require('./datetime'));

validate.validators.unique = require('./unique');

validate.validators.presence = require('./presence');

module.exports = validate;
