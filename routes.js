const router = require('express').Router();

module.exports = function(app) {
  router.namespace('v1', (v1) => {
    v1.get('register', {to: 'users#register'});
  });

  router.get('echo', (req, res) => {
    res.end('echo');
  });

  app.use(router);
};
