const router = require('routing/router')();

module.exports = function(app) {
  router.namespace('v1', (v1) => {
    v1.resources('users');

    v1.get('echo', (req, res) => {
      res.end('echo');
    });
  });

  app.use(router);
};
