const util = require('util');
const inherits = util.inherits;

const extend = function(obj, src) {
    for (let key in src) {
        if (src.hasOwnProperty(key)) {
            obj[key] = src[key];
        }
    }
    return obj;
};

const setIfPresent = function(name, value) {
    if (value) {
        this[name] = value;
    }
};

const error = function(data, initializer, oldInitializer) {
    let errorConstructor = function() {
        extend(this, data);
        this.setIfPresent = setIfPresent;
        if (initializer) {
            this.super = oldInitializer.bind(this);
            initializer.apply(this, arguments);
        } else if (oldInitializer) {
            oldInitializer.call(this, arguments);
        }
        Error.captureStackTrace(this, this.constructor);
        inherits(this.constructor, Error);
    };
    errorConstructor.extends = function(newData, newInitializer) {
        return error(newData, newInitializer, initializer);
    };
    return errorConstructor;
};

module.exports = error;