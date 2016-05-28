'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

module.exports = function(options) {
	gulp.task('watch',gulp.series('inject','scripts:watch', function watch(done) {
		gulp.watch([
			options.src + '/*.html',
			'./bower.json',
			options.src+'/app/**/*.{data.js}'
		], gulp.series('inject', function(done) {
			browserSync.reload();
			done();
		}));

		gulp.watch([
			options.src + '/{styles,components}/**/*.less'
		],function(event) {
			console.log(event)
			return gulp.series(event.type === 'changed' ? 'styles' : 'inject',function(){
				browserSync.reload();
			});
		});


		gulp.watch([
			'./server/**/*.js',
		],gulp.series('backEnd',function(done) {
			browserSync.reload();
			done();
		}));


		console.log()
		done();
	}));
};



// if(started) server.kill('SIGTERM');
// var env = Object.create( process.env );
// env.NODE_ENV = 'dev';

// var child = cp.fork('.tmp/serve/server/index.js',{env:env});
// if(watch) watch = false;
// child.once('message', function (message) {
// 	if (message.match(/^online$/)){
// 		if(browserSync && reload) browserSync.reload();
// 		if(!started) {
// 			started = true;
// 			if(callback) callback();
// 		}
// 	}
// });
// server = child;

// process.on('exit', function () {
// 	return server.kill('SIGTERM');
// });
