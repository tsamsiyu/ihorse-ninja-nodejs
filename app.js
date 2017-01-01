var express         = require('express');
var config          = require('config');
var log             = require('libs/log')(module);
var http            = require('http');
var path            = require('path');
var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser');
var errorHandler    = require('./middlewares/errorHandler');
var session         = require('express-session');
var mongoose        = require('./libs/mongoose');
var sessionPatch    = require('./middlewares/sessionPatch');
var responsePatch = require('./middlewares/responsePatch');
var app             = express();
var MongoStore      = require('connect-mongo')(session);

http.createServer(app).listen(config.get("port"), function () {
  log.info('Server started');
});

// MIDDLEWARE-s
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  // res.setHeader('Content-Type', 'application/json');
  next();
});
app.use(session({
  secret: config.get('session:secret'),
  key: config.get('session:key'),
  cookie: config.get('session:cookie'),
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  resave: true,
  saveUninitialized: true
}));
app.use(sessionPatch);
app.use(responsePatch.json);
app.use(express.static(path.join(__dirname, 'public')));
// ROUTES
app.get('/echo', (req, res) => {
  res.end('echo');
});
app.use('/', require('./routes/session'));
// app.use(function (req, res, next) {
//   // if (!res.user) {
//     app.use('/', require('./routes/guest'));
//   // }
//
//   next();
// });
// app.use('*', function(req, res, next) {
//   next(404);
// });
app.use(errorHandler); // TODO: need to test



module.exports = app;