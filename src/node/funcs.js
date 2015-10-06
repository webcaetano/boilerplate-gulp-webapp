var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var async = require('async');
var self = {};

self.getJsonURL = function(url){
	var root = path.join(__dirname, process.env.NODE_ENV=='dev' ? '../../../src' : '../');
	return JSON.parse(fs.readFileSync(path.resolve(root,url)));
}

module.exports = self;
