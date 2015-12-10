var fs = require('fs');
var path = require('path');

var defaults = {};

var utils = {
	extend:function(destObj) {
		for (var i = 1; i < arguments.length; i++) for (var key in arguments[i]) destObj[key] = arguments[i][key];
		return destObj;
	}
};

module.exports = function(options){
	options = utils.extend({},defaults,options);
}
