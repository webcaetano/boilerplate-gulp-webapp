var self = {};

var crypto = require('crypto');
var clc = require('cli-color');
var path = require('path');
var fs = require('fs');

self.dBug = function(m,t){
	var mColors={
		error:clc.redBright,
		success:clc.greenBright,
		info:clc.cyanBright,
		alert:clc.yellowBright
	};
	if(!t || !mColors[t]) {
		console.log(m);
	} else {
		console.log(mColors[t](m));
	}
}

self.root = function(){
	return path.join(__dirname, process.env.NODE_ENV=='dev' ? '../../../src' : '../');
}

self.getJsonURL = function(file){
	return JSON.parse(fs.readFileSync(path.join(self.root(),file), 'utf8'))
}

self.getPackage = function(file){
	return self.getJsonURL('../package.json');
}

self.dynamicSort = function(property) {
	var sortOrder = 1;
	if(property[0] === "-") {
		sortOrder = -1;
		property = property.substr(1);
	}
	return function (a,b) {
		var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
		return result * sortOrder;
	}
}

self.intval = function(mixed_var, base=10) {
	var tmp;
	var type = typeof mixed_var;

	if (type === 'boolean') {
		return +mixed_var;
	} else if (type === 'string') {
		tmp = parseInt(mixed_var, base);
		return (isNaN(tmp) || !isFinite(tmp)) ? 0 : tmp;
	} else if (type === 'number' && isFinite(mixed_var)) {
		return mixed_var | 0;
	} else {
		return 0;
	}
}

self.inArray = function(needle, haystack, argStrict){
	var key = '';
	var strict = !! argStrict;

	if (strict){
		for (key in haystack) if (haystack[key] === needle) return true;
	} else {
		for (key in haystack) if (haystack[key] == needle) return true;
	}
	return false;
}

self.extend = function(obj) {
	for (var i = 1; i < arguments.length; i++) for (var key in arguments[i]) obj[key] = arguments[i][key];
	return obj;
}

self.time = function(){
	return Math.floor(new Date().getTime() / 1000);
}

self.rand = function(min=0, max=100){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

self.noCache = function(res){
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
	res.header("Pragma", "no-cache");
	res.header("Expires",0);
}

self.randomIndex = function(arr){
	return arr[Math.floor(Math.random()*arr.length)];
}

self.strAsciiToArray = function(str){
	var resp = [];
	for(var i in str){
		resp.push(str[i].charCodeAt(0));
	}
	return resp;
}

self.arrayToAscii = function(arr){
	var resp = [];
	for(var i in arr){
		resp.push(String.fromCharCode(arr[i]));
	}
	return resp.join("");
}

self.md5 = function(str){
	if(!str) return '';
	var toMD5 = crypto.createHash("md5");
	return toMD5.update(str).digest("hex");
}

module.exports = self;
