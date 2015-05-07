'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

function isOnlyChange(event) {
	return event.type === 'changed';
}

module.exports = function(options) {
	gulp.task('watch', ['scripts:watch', 'inject'], function () {

		gulp.watch([options.src + '/*.html', 'bower.json'], function(event) {
			gulp.start('inject',function(){
				browserSync.reload(event.path);
			});
		});

		gulp.watch([
			options.src + '/{app,components}/**/*.acss',
			options.src + '/{app,components}/**/*.scss'
		], function(event) {
			if(isOnlyChange(event)) {
				gulp.start('styles');
			} else {
				gulp.start('inject');
			}
		});


		gulp.watch(options.src + '/{app,components}/**/*.html', function(event) {
			console.log('xxxxyyy')
			browserSync.reload(event.path);
		});
	});
};
