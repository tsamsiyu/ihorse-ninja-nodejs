const mongooseInitializer = require('initializers/mongooseInitializer');
const loggerInitializer = require('initializers/loggerInitializer');
const configInitializer = require('initializers/configInitializer');
const lodashInitializer = require('initializers/lodashInitializer');
const routesInitializer = require('initializers/routesInitializer');

module.exports = function(app, run) {
  configInitializer(app);
  loggerInitializer(app);
  mongooseInitializer(app);
  lodashInitializer(app);
  routesInitializer(app);
  run();
};
