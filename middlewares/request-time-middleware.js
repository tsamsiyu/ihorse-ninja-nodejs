const moment = require('moment');

module.exports = function (req, res, next) {
  const app = req.app;
  const logger = app.get('logger');
  const interceptor = {};
  interceptor.startTime = moment();
  const fulldate = interceptor.startTime.format('YYYY-MM-DD HH-mm-ss ms');

  logger.info(`Request was initiated at ${fulldate}`);

  res.on('finish', function () {
    interceptor.endTime = moment();
    interceptor.rangeTime = interceptor.endTime.diff(interceptor.startTime);
    logger.info(`Request finished in ${interceptor.rangeTime} milliseconds`);
  });
  next();
};
