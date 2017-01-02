const winston = require('winston');

module.exports = function (app) {
  const path = module.filename.split('/').slice(-2).join('/');

  const consoleTransport = new winston.transports.Console({
    colorize: true,
    level: (app.get('env') == 'development') ? 'debug' : 'error',
    label: path
  });

  const logger = new (winston.Logger)({
    transports: [consoleTransport]
  });

  app.set('logger', logger);
};
