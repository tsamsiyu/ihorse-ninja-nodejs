const winston = require('winston');
const path = require('path');
const stackTrace = require('stack-trace');

module.exports = function (app) {
  const root = path.resolve('.');

  const consoleTransport = new winston.transports.Console({
    colorize: true,
    level: (app.get('env') == 'development') ? 'debug' : 'error'
  });

  const baseLog = consoleTransport.log;
  consoleTransport.log = function () {
    const calledFromFile = stackTrace.get()[7].getFileName();
    this.label = calledFromFile.substr(root.length + 1);
    baseLog.apply(this, arguments);
  };

  const logger = new (winston.Logger)({
    transports: [consoleTransport]
  });

  logger.on('logging', function (transport, level, msg, meta) {
    // console.log(transport);
    // [msg] and [meta] have now been logged at [level] to [transport]
  });

  app.set('logger', logger);
};
