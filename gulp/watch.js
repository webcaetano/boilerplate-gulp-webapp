'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

function isOnlyChange(event) {
	return event.type === 'changed';
}

module.exports = function(options) {
	gulp.task('watch', function (done) {
		runSequence('inject',['scripts:watch'],function(){
			gulp.watch([options.src + '/*.html', options.src + '/*.html', 'bower.json'], function(event) {
				gulp.start('inject',function(){
					browserSync.reload();
				});
			});

			gulp.watch([
				options.src + '/{styles,components}/**/*.less'
			], function(event) {
				if(isOnlyChange(event)) {
					gulp.start('styles',function(){
						browserSync.reload();
					});
				} else {
					gulp.start('inject');
				}
			});

			gulp.watch(options.src + '/{app,views,components}/**/*.html', function(event) {
				browserSync.reload(event.path);
			});
			done();
		});
	});

};
