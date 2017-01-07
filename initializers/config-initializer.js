const nconf = require('nconf');
const path = require('path');
const indexConfig = require('config/index');
const _ = require('lodash');

module.exports = function (app) {
  const envConfig = require(path.join('config', 'environment', app.get('env')));
  let config = _.merge(indexConfig, envConfig);

  try {
    const localConfig = require('config/local');
    config = _.merge(config, localConfig);
  } catch (e) {}

  const configObject = nconf.argv()
    .env()
    .defaults(config);

  app.set('root', path.resolve('../'));
  app.set('config', configObject);
};
