const Router = require('routing/router');

module.exports = function(app) {
  app.routing = function(cb) {
    const router = new Router;
    cb(router);
    app.use(router.getMap());
  };
};
