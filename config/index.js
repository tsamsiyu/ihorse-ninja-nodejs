var nconf = require('nconf');
var path = require('path');
var configPath = path.join(__dirname, 'config.json');

nconf.argv()
	.env()
	.file({file: configPath});

module.exports = nconf;