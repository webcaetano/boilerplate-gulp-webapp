'use strict';

var path = require('path');
var gulp = require('gulp');
var browserSync = require('browser-sync');
var wiredep = require('wiredep').stream;
var _ = require('lodash');

var $ = require('gulp-load-plugins')();

module.exports = function(options) {
	var buildStyles = function () {
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

		// var indexFilter = $.filter('index.less');
		var wiredepOptions = {
			directory: 'bower_components'
		};

		return gulp.src([
			options.src + '/styles/index.less',
			// options.src + '/styles/vendor.less'
		])
		.pipe($.inject(injectFiles, injectOptions))
		.pipe(wiredep(_.extend({}, wiredepOptions)))
		.pipe($.sourcemaps.init())
		.pipe($.less(lessOptions)).on('error', options.errorHandler('Less'))
		.pipe($.autoprefixer()).on('error', options.errorHandler('Autoprefixer'))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest(options.tmp + '/serve/styles/'))
	};

	gulp.task('styles', function() {
	  return buildStyles();
	});

	gulp.task('styles-reload', gulp.series('styles', function() {
	  	return buildStyles()
	    .pipe(browserSync.stream());
	}));


};
