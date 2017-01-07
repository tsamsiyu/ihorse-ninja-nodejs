const util = require('util');
const methods = require('methods');
const _ = require('lodash');

module.exports = function (Router) {
  Router.namespaceOption = [];
  Router.resourcesOption = [];

  Router.namespace = function (value, cb) {
    this.namespaceOption.push(_.trim(value, '/'));
    cb(this);
    this.namespaceOption = [];
  };

  methods.concat('all').forEach(function (method) {
    const oldMethodHandler = Router[method];
    Router[method] = function () {
      if (this.namespaceOption.length) {
        arguments[0] = '/' + this.namespaceOption.join('/') + '/' + _.trimStart(arguments[0], '/');
      }
      oldMethodHandler.apply(this, arguments);
    };
  });

  Router.resources = function (name, cb) {
    this.resourcesOption.push(name);
    this.addResourceRouter();
    cb && cb(this);
    this.resourcesOption = [];
  };

  Router.action = function(routeName) {
    const [controllerName, actionName] = routeName.split('#');
    const controllerModule = `controllers/${controllerName}-controller`;
    return (req, res, next) => {
      const controllerClass = require(controllerModule);
      const controller = new controllerClass();
      controller.runAction(actionName, req, res, next);
    }
  };

  const parentGet = Router.get;
  Router.get = function () {
    if (arguments[1] && typeof arguments[1] === 'object') { // second argument is hash
      if (arguments[1].to) { // get('/users', {to: 'users#show'})
        arguments[1] = this.action(arguments[1].to);
      }
    }
    parentGet.apply(this, arguments);
  };

  Router.addResourceRouter = function () {
    let uri = [];
    this.resourcesOption.forEach((parentResource) => {
      uri.push(_.trim(parentResource, '/'));
      uri.push(':' + _.singularize(parentResource) + 'Id');
    });
    const lastPathItem = uri.pop();
    const listPath = '/' + uri.join('/');
    const memberPath = listPath + '/' + lastPathItem;
    const controller = this.resourcesOption.slice(-1, 1).pop();

    this.get(listPath, this.action(`${controller}#list`));
    this.get(memberPath, this.action(`${controller}#item`));
    this.post(listPath, this.action(`${controller}#create`));
    this.patch(memberPath, this.action(`${controller}#update`));
    this.delete(memberPath, this.action(`${controller}#delete`));
    this.options(listPath, this.action(`${controller}#options`));
    this.options(memberPath, this.action(`${controller}#options`));
  };

  module.exports = Router;
};
