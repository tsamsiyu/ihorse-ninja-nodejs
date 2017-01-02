const express = require('express');
const expressRouter = express.Router();
const _ = require('lodash');

class Router {
  constructor(parent) {
    this.resourcesOption = [];
    this.namespaceOption = [];
    _.assignIn(this, parent);
  }
  namespace(value, cb) {
    const router = new Router(this);
    router.namespaceOption.push(value);
    if (typeof cb == 'function') cb(router);
    return this;
  }
  resources(name, cb) {
    const router = new Router(this);
    router.resourcesOption.push(name);
    router.apply();
    if (typeof cb == 'function') cb(router);
    return this;
  }
  controllerClass() {
    if (!this._controller) {
      const resource = this.resourcesOption.slice(-1, 1).pop();
      this._controller = require(`controllers/${resource}Controller`);
    }
    return this._controller;
  }
  action(name) {
    return (req, res) => {
      const controllerClass = this.controllerClass();
      const controller = new controllerClass();
      controller.runAction(name, req, res);
    }
  }
  apply() {
    let path = this.namespaceOption;
    this.resourcesOption.forEach((parentResource) => { // TODO: need to add trim
        path.push(parentResource);
        path.push(':' + _.singularize(parentResource) + 'Id');
    });
    const lastPathItem = path.pop();
    const listPath = '/' + path.join('/');
    const memberPath = listPath + '/' + lastPathItem;
    expressRouter.get(listPath, this.action('list'));
    expressRouter.get(memberPath, this.action('item'));
    expressRouter.post(listPath, this.action('create'));
    expressRouter.patch(memberPath, this.action('update'));
    expressRouter.delete(memberPath, this.action('delete'));
    expressRouter.options(listPath, this.action('options'));
    expressRouter.options(memberPath, this.action('options'));
  }
  getMap() {
    return expressRouter;
  }
}

module.exports = Router;
