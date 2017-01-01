const http          = require('http');
const log           = require('libs/log')(module);
const app           = require('express')();
const middlewares   = require('./middlewares');
const initializers  = require('./initializers');
const config        = require('config');

const port = config.get('port');
http.createServer(app).listen(port, function() {
    log.info('Server started at port ' + port);
});

initializers(app, config);
middlewares(app, config);

module.exports = app;