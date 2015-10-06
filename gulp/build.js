'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

var $ = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

module.exports = function(options) {
	gulp.task('partials', function () {
		return gulp.src([
			options.src + '/app/**/*.html'
		])
		.pipe($.minifyHtml({
			empty: true,
			spare: true,
			quotes: true
		}))
		.pipe($.angularTemplatecache('templateCacheHtml.js', {
			module: 'heros'
		}))
		.pipe(gulp.dest(options.tmp + '/partials/'));
	});


	gulp.task('html', ['inject', 'node:dist', 'partials'], function () {
		var partialsInjectFile = gulp.src(options.tmp + '/partials/templateCacheHtml.js', { read: false });
		var partialsInjectOptions = {
			starttag: '<!-- inject:partials -->',
			ignorePath: options.tmp + '/partials',
			addRootSlash: false
		};

		var assets;
		return gulp.src(options.tmp + '/serve/*.html')
			.pipe($.inject(partialsInjectFile, partialsInjectOptions))
			.pipe(assets = $.useref.assets())
			.pipe($.rev())
			.pipe($.if('*.js', $.ngAnnotate()))
			.pipe($.if('*.js', $.uglify()))
			.pipe($.replace('../../bower_components/font-awesome-less/fonts/', '../fonts/'))
			.pipe($.if('*.css', $.csso()))
			.pipe(assets.restore())
			.pipe($.useref())
			.pipe($.revReplace())
			.pipe($.if('*.html', $.minifyHtml({empty: true,	spare: true, quotes: true, conditionals: true})))
			.pipe(gulp.dest(options.dist + '/'))
			.pipe($.size({ title: options.dist + '/', showFiles: true }));
	});

	// Only applies for fonts from bower dependencies
	// Custom fonts are handled by the "other" task
	gulp.task('fonts', function () {
		return gulp.src($.mainBowerFiles())
			.pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
			.pipe($.flatten())
			.pipe(gulp.dest(options.dist + '/fonts/'));
	});

	gulp.task('other', function () {
		return gulp.src([
			options.src + '/**/*',
			'!' + options.src + '/**/*.{css,js,less}'
		])
		.pipe(gulp.dest(options.dist + '/'));
	});

	gulp.task('rest', function (done) {
		$.del([
			options.dist + '/app',
			options.dist + '/sass',
		], done);
	});

	gulp.task('clean', function (done) {
		$.del([options.dist + '/', options.tmp + '/'], done);
	});

	gulp.task('build',function(done){
		runSequence('clean',['html', 'fonts', 'other'],'rest',done);
	});
};
