const corsMiddleware = require('middlewares/corsMiddleware');
const authMiddleware = require('middlewares/authMiddleware');
const requestMiddleware = require('middlewares/requestMiddleware');
const responseMiddleware = require('middlewares/responseMiddleware');
const errorMiddleware = require('middlewares/errorMiddleware');

module.exports = function (app) {
  app.use(corsMiddleware);
  app.use(requestMiddleware);
  app.use(authMiddleware);
  app.use(responseMiddleware);
  app.use(errorMiddleware);
};
