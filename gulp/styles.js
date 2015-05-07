'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

module.exports = function(options) {
	gulp.task('styles', function () {
		var sassOptions = {
			style: 'expanded'
		};

		var injectFiles = gulp.src([
			options.src + '/{sass,components}/**/*.scss',
			'!' + options.src + '/sass/index.scss',
			'!' + options.src + '/sass/vendor.scss'
		], { read: false });

		var injectOptions = {
			transform: function(filePath) {
				filePath = filePath.replace(options.src + '/sass/', '');
				filePath = filePath.replace(options.src + '/components/', '../components/');
				return '@import \'' + filePath + '\';';
			},
			starttag: '// injector',
			endtag: '// endinjector',
			addRootSlash: false
		};

		var indexFilter = $.filter('index.scss');

		return gulp.src([
			options.src + '/sass/index.scss',
			options.src + '/sass/vendor.scss'
		])
		.pipe(indexFilter)
		.pipe($.inject(injectFiles, injectOptions))
		.pipe(indexFilter.restore())
		.pipe($.sourcemaps.init())
		.pipe($.sass(sassOptions)).on('error', options.errorHandler('Sass'))
		.pipe($.autoprefixer()).on('error', options.errorHandler('Autoprefixer'))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest(options.tmp + '/serve/sass/'))
		// .pipe(browserSync.reload({ stream: true }));
	});
};
