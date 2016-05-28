'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var util = require('util');
var cp = require('child_process');
var server;

module.exports = function(options) {

	function browserSyncInit(config) {
		var routes = null;
		browserSync.instance = browserSync.init(config);
	}


	gulp.task('serve', gulp.series('watch', function serve(done) {
		// conslle.log('xxxx')
		var env = Object.create( process.env );
		env.NODE_ENV = 'dev';

		var child = cp.fork('./server/index.js',{env:env});
		child.once('message', function (message) {
			if (message.match(/^online$/)){
				browserSyncInit({
					startPath: '/',
					browser: 'default',
					open:false,
					logPrefix: 'RSK',
					notify: false,
					https: false,
					port:3000,
					proxy: 'localhost:4000'
				},done);
			}
		});
		server = child;

		process.on('exit', function () {
			return server.kill('SIGTERM');
		});
	}));

	// gulp.task('serve:dist', ['build'], function () {
	// 	var env = Object.create( process.env );
	// 	env.NODE_ENV = 'dist';

	// 	var child = cp.fork('dist/node/index.js',{env: env});
	// 	child.once('message', function (message) {
	// 		if (message.match(/^online$/))browserSyncInit(options.dist);
	// 	});
	// 	process.on('exit', function () {
	// 		return child.kill('SIGTERM');
	// 	});
	// });
};


// 'use strict';

// var gulp = require('gulp');
// var browserSync = require('browser-sync');
// var util = require('util');

// module.exports = function(options) {
// 	function browserSyncInit(baseDir, browser='default', done) {
// 		var routes = null;
// 		if(baseDir === options.src || (util.isArray(baseDir) && baseDir.indexOf(options.src) !== -1)) {
// 			routes = {
// 				'/bower_components': 'bower_components'
// 			};
// 		}

// 		var server = {
// 			baseDir: baseDir,
// 			routes: routes
// 		};

// 		browserSync.instance = browserSync.init({
// 			startPath: '/',
// 			server: server,
// 			browser: browser,
// 			notify: false,
// 			//proxy: 'localhost:8000',
// 			// port:4000,
// 			open: false
// 		});

// 		done();
// 	}

// 	gulp.task('serve', gulp.series('watch', browserSyncInit.bind(null,[options.tmp + '/serve', options.src],null)));
// 	gulp.task('serve:dist', gulp.series('build', browserSyncInit.bind(null,options.dist,null)));
// };


