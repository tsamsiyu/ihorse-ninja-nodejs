const _ = require('lodash');
const lodashInflection = require('lodash-inflection');

module.exports = function(app) {
  _.mixin(lodashInflection);
};
