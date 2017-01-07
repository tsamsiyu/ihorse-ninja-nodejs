const routerPatch = require('routing/router');

module.exports = function (App) {
  routerPatch(App.Router);
};
