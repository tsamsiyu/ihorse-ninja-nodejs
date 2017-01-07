const nconf = require('nconf');
const path = require('path');
const indexConfig = require('config/index');
const _ = require('lodash');

module.exports = function (app) {
  const envConfig = require(path.join('config', 'environment', app.get('env')));
  const config = _.merge(indexConfig, envConfig);
  const configObject = nconf.argv()
    .env()
    .defaults(config);

  app.set('root', path.resolve('../'));
  app.set('config', configObject);
};
