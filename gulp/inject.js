'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

module.exports = function(options) {
	gulp.task('inject', gulp.series('scripts', 'styles', function inject() {
		var injectStyles = gulp.src([
			options.tmp + '/serve/styles/**/*.css',
			'!' + options.tmp + '/serve/styles/vendor.css'
		], { read: false });


		var injectScripts = gulp.src([
			options.tmp + '/serve/scripts/**/*.js',
		], { read: false });

		var injectOptions = {
			ignorePath: [options.src, options.tmp + '/serve'],
			addRootSlash: false
		};

		var wiredepOptions = {
			directory: 'bower_components',
		};

		return gulp.src(options.src + '/*.html')
			.pipe($.inject(injectStyles, injectOptions))
			.pipe($.inject(injectScripts, injectOptions))
			.pipe(wiredep(wiredepOptions))
			.pipe(gulp.dest(options.tmp + '/serve'));
	}));
};
