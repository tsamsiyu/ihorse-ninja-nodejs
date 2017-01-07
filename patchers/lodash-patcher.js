const _ = require('lodash');
const lodashInflection = require('lodash-inflection');

module.exports = function(App) {
  _.mixin(lodashInflection);
};
