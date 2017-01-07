let ExpressRouter = require('express').Router;
const util = require('util');
const methods = require('methods');
const _ = require('lodash');


ExpressRouter.namespaceOption = [];
ExpressRouter.resourcesOption = [];

ExpressRouter.namespace = function (value, cb) {
  this.namespaceOption.push(_.trim(value, '/'));
  cb(this);
  this.namespaceOption = [];
};

methods.concat('all').forEach(function (method) {
  const oldMethodHandler = ExpressRouter[method];
  ExpressRouter[method] = function () {
    if (this.namespaceOption.length) {
      arguments[0] = '/' + this.namespaceOption.join('/') + '/' + _.trimStart(arguments[0], '/');
    }
    oldMethodHandler.apply(this, arguments);
  };
});

ExpressRouter.resources = function (name, cb) {
  this.resourcesOption.push(name);
  this.addResourceRouter();
  cb && cb(this);
  this.resourcesOption = [];
};

ExpressRouter.controllerClass = function() {
  if (!this._controller) {
    const resource = this.resourcesOption.slice(-1, 1).pop();
    this._controller = require(`controllers/${resource}-controller`);
  }
  return this._controller;
};

ExpressRouter.action = function(name) {
  const controllerClass = this.controllerClass();
  return (req, res, next) => {
    const controller = new controllerClass();
    controller.runAction(name, req, res, next);
  }
};

ExpressRouter.addResourceRouter = function () {
  let uri = [];
  this.resourcesOption.forEach((parentResource) => {
    uri.push(_.trim(parentResource, '/'));
    uri.push(':' + _.singularize(parentResource) + 'Id');
  });
  const lastPathItem = uri.pop();
  const listPath = '/' + uri.join('/');
  const memberPath = listPath + '/' + lastPathItem;

  this.get(listPath, this.action('list'));
  this.get(memberPath, this.action('item'));
  this.post(listPath, this.action('create'));
  this.patch(memberPath, this.action('update'));
  this.delete(memberPath, this.action('delete'));
  this.options(listPath, this.action('options'));
  this.options(memberPath, this.action('options'));
};

module.exports = ExpressRouter;
