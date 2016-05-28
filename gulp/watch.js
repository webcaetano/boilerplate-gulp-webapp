'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

module.exports = function(options) {

	gulp.task('fullReload',gulp.series('inject',function(done){
		browserSync.reload();
		done();
	}));

	gulp.task('watch',gulp.series('inject','scripts:watch', function watch(done) {
		gulp.watch([
			options.src + '/*.html',
			'./bower.json',
			options.src+'/app/**/*.{data.js}'
		], gulp.series('fullReload'));

		browserSync.reload

		gulp.watch([
			options.src + '/styles/**/*.less'
		])
		.on('change',function(a,b,c,d){
			return gulp.series('styles',function(done){
				browserSync.reload();
				done();
			})();
		})
		.on('add',gulp.series('fullReload'))
		.on('addDir',gulp.series('fullReload'))
		.on('unlink',gulp.series('fullReload'))
		.on('unlinkDir',gulp.series('fullReload'))



		gulp.watch([
			'./server/**/*.js',
		],gulp.series('backEnd','fullReload'));

		done();
	}));
};
