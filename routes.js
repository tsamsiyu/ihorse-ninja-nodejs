module.exports = function(app) {
  app.routing((router) => {
    router.namespace('v1', (v1) => {
      v1.resources('users');
    });
  });
};
