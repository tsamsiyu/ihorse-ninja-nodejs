module.exports.method = function (object, methodName, extender) {
  const previous = object[methodName];
  object[methodName] = function () {
    const methodArguments = arguments;
    this.super = previous;
    const res = extender.apply(this, methodArguments);
    this.super = null;
    return res;
  };
};

module.exports.func = function (previous, extender) {
  return function () {
    previous.super = previous;
    const res = extender.apply(previous, arguments);
    previous.super = undefined;
    return res;
  };
};
