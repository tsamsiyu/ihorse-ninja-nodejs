const http = require('http');
const app = require('express')();
const middlewares = require('middlewares');
const initializers = require('initializers');
const routes = require('routes');

initializers(app, () => {
  const port = app.get('config').get('server:port');
  http.createServer(app).listen(port, function () {
    app.get('logger').info(`Server started at port ${port}`);
  });
});

routes(app);
middlewares(app);

module.exports = app;
