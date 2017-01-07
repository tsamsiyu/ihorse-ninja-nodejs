const corsMiddleware = require('middlewares/cors-middleware');
const authMiddleware = require('middlewares/auth-middleware');
const requestMiddleware = require('middlewares/request-middleware');
const responseMiddleware = require('middlewares/response-middleware');
const errorMiddleware = require('middlewares/error-middleware');

module.exports = function (app) {
  app.use(corsMiddleware);
  app.use(requestMiddleware);
  app.use(authMiddleware);
  app.use(responseMiddleware);
  app.use(errorMiddleware);
};
