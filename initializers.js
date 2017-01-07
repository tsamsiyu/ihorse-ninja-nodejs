const mongooseInitializer = require('initializers/mongoose-initializer');
const loggerInitializer = require('initializers/logger-initializer');
const configInitializer = require('initializers/config-initializer');
const lodashInitializer = require('initializers/lodash-initializer');

module.exports = function(app, run) {
  configInitializer(app);
  loggerInitializer(app);
  mongooseInitializer(app);
  lodashInitializer(app);
  run();
};
