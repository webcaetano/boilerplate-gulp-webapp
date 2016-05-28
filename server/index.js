var http = require('http');
var path = require('path');
var express = require('express');
var utils = require('./utils');
var app = require('./server')(express);
var funcs = require('./funcs');
var pkg = utils.getPackage();

var scope = {
	version:(pkg.beta ? 'Beta ' : 'v')+pkg.version
};

require('./routes/')(app,scope);

if(!process.env.test) {
	app.start();
} else {
	module.exports =  {
		utils:utils,
		mysql:require('./mysql')
	};
}
