const routerPatcher = require('patchers/router-patcher');
const lodashPatcher = require('patchers/lodash-patcher');

module.exports = function (App, start) {
  routerPatcher(App);
  lodashPatcher(App);

  const app = App();
  start(app);
  return app;
};
