const corsMiddleware = require('middlewares/cors-middleware');
const authMiddleware = require('middlewares/auth-middleware');
const requestMiddleware = require('middlewares/request-middleware');
const errorMiddleware = require('middlewares/error-middleware');
const requestTimeMiddleware = require('middlewares/request-time-middleware');

module.exports = function (app, request) {
  app.use(requestTimeMiddleware);
  app.use(corsMiddleware);
  app.use(requestMiddleware);
  app.use(authMiddleware);
  request();
  app.use(errorMiddleware);
};
