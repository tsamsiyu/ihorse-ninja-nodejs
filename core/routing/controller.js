const NotFoundHttpError = require('errors/http/NotFoundHttpError');

class Controller {
  runAction(name, req, res) {
    const action = this[name];
    if (typeof action === 'function') {
      action.call(this, req, res);
    } else {
      this.actionMissing(req, res);
    }
  }
  actionMissing(req, res) {
    throw new NotFoundHttpError;
  }
  options(req, res) {
    res.end();
  }
}

module.exports = Controller;
