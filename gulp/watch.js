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
			options.src + '/{sass,components}/**/*.acss',
			options.src + '/{sass,components}/**/*.scss'
		], function(event) {
			if(isOnlyChange(event)) {
				gulp.start('styles',function(){
					browserSync.reload();
				});
			} else {
				gulp.start('inject');
			}
		});


		gulp.watch(options.src + '/{app,components}/**/*.html', function(event) {
			browserSync.reload(event.path);
		});
	});
};
