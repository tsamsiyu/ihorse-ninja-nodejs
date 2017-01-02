const util = require('util');
const inherits = util.inherits;
const _ = require('lodash');

const setIfPresent = function (name, value) {
  if (value) this[name] = value;
};

const error = function (data, initializer) {
  let errorConstructor = function () {
    _.assignIn(this, data);
    this.setIfPresent = setIfPresent;
    this.super = initializer.prototype.super;
    initializer.apply(this, arguments);
    Error.captureStackTrace(this, this.constructor);
    inherits(this.constructor, Error);
  };
  errorConstructor.extends = function (newData, newInitializer) {
    if (newInitializer) {
      newInitializer.prototype.super = initializer;
    } else {
      newInitializer = initializer;
    }
    if (newData) {
      newData = _.merge(data, newData);
    } else {
      newData = data;
    }
    return error(newData, newInitializer, initializer);
  };
  return errorConstructor;
};

module.exports = error;
