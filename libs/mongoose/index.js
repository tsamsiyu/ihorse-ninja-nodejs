var mongoose            = require('mongoose');
var config              = require('config');
var modelBasePatch      = require('./basePatch');
var modelRelationsPatch = require('./relationsPatch');

mongoose.connect(config.get('db:uri'), config.get('libs:mongoose'));

var prevModelFunction = mongoose.model;

mongoose.model = function(name, schema, collection, skipInit) {
    var m = prevModelFunction.call(mongoose, name, schema, collection, skipInit);

    modelBasePatch.call(this, m);
    // modelRelationsPatch.call(this, m);

    return m;
};

module.exports = mongoose;