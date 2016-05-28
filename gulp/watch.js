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

		done();
	}));
};
