const bodyParser = require('body-parser');

module.exports = function (req, res, next) {
  req.app.use(bodyParser.urlencoded({extended: true}));
  req.app.use(bodyParser.json());
  next();
};
