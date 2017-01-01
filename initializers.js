const mongooseInitializer = require('initializers/mongooseInitializer');

module.exports = function (app, config) {
    mongooseInitializer(app, config);
};