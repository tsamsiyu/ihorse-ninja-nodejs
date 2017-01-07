const User = require('pods/users/User');

module.exports = function (req, res, next) {
  const TOKEN_REGEXP = /^Bearer\s(\w+)$/;

  let authHeader = req.headers.authorization;
  if (authHeader instanceof String) {
    const matches = authHeader.match(TOKEN_REGEXP);
    if (matches) {
      const token = matches[1];
      User.findOne({authToken: token}).populate('profile').exec((err, user) => {
        if (err) return next(err);
        req.appUser = user;
        next();
      });
    } else {
      next();
    }
  } else {
    next();
  }
};
