const mongoose = require('mongoose');

module.exports = function (app) {
  const mongooseConfig = app.get('config').get('mongoose');
  mongoose.connect(mongooseConfig.uri, mongooseConfig.server, (error) => {
    if (error) {
      app.get('logger').error("Can't connect to mongodb");
      throw error;
    }
  });
};
