const mongooseInitializer = require('initializers/mongoose-initializer');
const loggerInitializer = require('initializers/logger-initializer');
const configInitializer = require('initializers/config-initializer');

module.exports = function(app, run) {
  configInitializer(app);
  loggerInitializer(app);
  mongooseInitializer(app);
  run();
};
