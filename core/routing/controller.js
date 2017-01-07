const NotFoundHttpError = require('errors/http/not-found-http-error');

class Controller {
  runAction(name, req, res, next) {
    const action = this[name];
    if (typeof action === 'function') {
      action.call(this, req, res, next);
    } else {
      this.actionMissing(req, res, next);
    }
  }
  actionMissing(req, res, next) {
    throw new NotFoundHttpError;
  }
  options(req, res, next) {
    res.end();
  }
}

module.exports = Controller;
