const mongoose  = require('mongoose');

module.exports = function(app, config) {
    mongoose.connect(config.get('db:uri'), config.get('libs:mongoose'));
};