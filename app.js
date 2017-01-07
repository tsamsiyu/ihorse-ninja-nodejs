const http = require('http');
const App = require('express');
const middlewares = require('middlewares');
const initializers = require('initializers');
const patchers = require('patchers');
const routes = require('routes');

module.exports = patchers(App, (app) => {
  initializers(app, () => {
    const port = app.get('config').get('server:port');
    http.createServer(app).listen(port, function () {
      app.get('logger').info(`Server started at port ${port}`);
    });
  });
  middlewares(app, () => {
    routes(app);
  });
});
