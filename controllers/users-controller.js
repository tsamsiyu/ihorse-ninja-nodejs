const Controller = require('routing/controller');

class UsersController extends Controller {
  register(req, res, next) {
    setTimeout(() => {
      res.end('registered');
      next();
    }, 1300);
  }
}

module.exports = UsersController;
