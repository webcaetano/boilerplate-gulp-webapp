'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var util = require('util');
var cp = require('child_process');
var server;

module.exports = function(options) {

	function browserSyncInit(baseDir, browser) {
		browser = browser === undefined ? 'default' : browser;

		var routes = null;
		if(baseDir === options.src || (util.isArray(baseDir) && baseDir.indexOf(options.src) !== -1)) {
			routes = {
				'/bower_components': 'bower_components'
			};
		}

		browserSync.instance = browserSync.init({
			startPath: '/',
			browser: browser,
			open:false,
			logPrefix: 'RSK',
			notify: false,
			https: false,
			port:3000,
			proxy: 'localhost:4000'
		});
	}

	gulp.task('serve', ['watch'], function () {
		browserSyncInit([options.tmp + '/serve', options.src]);
	});

	gulp.task('serve:dist', ['build'], function () {
		var env = Object.create( process.env );
		env.NODE_ENV = 'dist';

		var child = cp.fork('dist/node/index.js',{env: env});
		child.once('message', function (message) {
			if (message.match(/^online$/))browserSyncInit(options.dist);
		});
		process.on('exit', function () {
			return child.kill('SIGTERM');
		});
	});
};
