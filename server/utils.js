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
	return path.join(__dirname, process.env.NODE_ENV=='dev' ? '../src' : '../');
}

self.getJsonURL = function(file){
	return JSON.parse(fs.readFileSync(path.join(self.root(),file), 'utf8'))
}

self.getPackage = function(file){
	return self.getJsonURL('../package.json');
}

self.time = function(){
	return Math.floor(new Date().getTime() / 1000);
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
