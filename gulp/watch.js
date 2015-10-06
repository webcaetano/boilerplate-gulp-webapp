'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

function isOnlyChange(event) {
	return event.type === 'changed';
}

module.exports = function(options) {
	gulp.task('watch', ['inject','scripts:watch'], function (done) {
		runSequence('inject',['scripts:watch'],function(){
			gulp.watch([options.src + '/*.html'], function(event) {
				gulp.start('inject',function(){
					browserSync.reload();
				});
			});


			gulp.watch(options.src + '/{app,components}/**/*.html', function(event) {
				browserSync.reload(event.path);
			});
			done();
		});
	});
};
