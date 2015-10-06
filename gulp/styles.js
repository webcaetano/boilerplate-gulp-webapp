'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

module.exports = function(options) {
	gulp.task('styles', function () {
		var lessOptions = {
			options: [
				'bower_components',
				options.src + '/styles',
			]
		};

		var injectFiles = gulp.src([
			options.src + '/{app,styles}/**/*.less',
			'!' + options.src + '/less/index.less',
			'!' + options.src + '/less/vendor.less'
		], { read: false });

		var injectOptions = {
			transform: function(filePath) {
				filePath = filePath.replace(options.src + '/less/', '');
				return '@import \'' + filePath + '\';';
			},
			starttag: '// injector',
			endtag: '// endinjector',
			addRootSlash: false
		};

		var indexFilter = $.filter('index.less');

		return gulp.src([
			options.src + '/styles/index.less',
			options.src + '/styles/vendor.less'
		])
		.pipe(indexFilter)
		.pipe($.inject(injectFiles, injectOptions))
		.pipe(indexFilter.restore())
		.pipe($.sourcemaps.init())
		.pipe($.less(lessOptions)).on('error', options.errorHandler('Less'))
		.pipe($.autoprefixer()).on('error', options.errorHandler('Autoprefixer'))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest(options.tmp + '/serve/styles/'))
	});
};
