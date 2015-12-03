'use strict';

var gulp = require('gulp');
var path = require('path');
var webpack = require('webpack');
var browserSync = require('browser-sync');
var cp = require('child_process');
var merge = require('lodash/object/merge');

var $ = require('gulp-load-plugins')();

var started = false;
var server;

var DEBUG = false;
var STYLE_LOADER = 'style-loader/useable';
var CSS_LOADER = DEBUG ? 'css-loader' : 'css-loader?minimize';
var GLOBALS = {
	'__DEV__': DEBUG
};

var config = {
	output: {
		publicPath: './',
		sourcePrefix: '  '
	},
	cache: DEBUG,
	debug: DEBUG,
	stats: {
		colors: true,
		reasons: DEBUG
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin()
	],
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
	}
}

var serverConfig = merge({}, config, {
	entry: './src/node/index.js',
	output: {
	// path: './../.tmp/serve/node',
	filename: 'index.js',
	libraryTarget: 'commonjs2'
	},
	target: 'node',
	externals: [
	function (context, request, cb) {
		var isExternal =
		request.match(/^[a-z][a-z\/\.\-0-9]*$/i) &&
		!request.match(/^react-routing/) &&
		!context.match(/[\\/]react-routing/);
		cb(null, Boolean(isExternal));
	}
	],
	node: {
	console: false,
	global: false,
	process: false,
	Buffer: false,
	__filename: false,
	__dirname: false
	},
	devtool: DEBUG ? 'source-map' : 'cheap-module-source-map',
	plugins: config.plugins.concat(
	new webpack.DefinePlugin(merge(GLOBALS, {'__SERVER__': true})),
	new webpack.BannerPlugin('require("source-map-support").install();',
		{ raw: true, entryOnly: false })
	),
	module: {
		loaders: [
		{
			test: /\.js?$/,
			exclude:['node_modules'],
			loader: 'babel-loader'
		}]
	}
});

gulp.task('nodemon', function (cb) {

});



module.exports = function(options) {
	function webpack(path, watch, callback, reload, notServer) {
		if(!watch) watch=false;
		var webpackChangeHandler = function(err, stats) {
			if(err) {
				options.errorHandler('Webpack')(err);
			}
			$.util.log(stats.toString({
				colors: $.util.colors.supportsColor,
				chunks: false,
				hash: false,
				version: false
			}));
			if(notServer) return;
			if(started) server.kill('SIGTERM');
			var env = Object.create( process.env );
			env.NODE_ENV = 'dev';

			var child = cp.fork('.tmp/serve/node/index.js',{env:env});
			if(watch) watch = false;
			child.once('message', function (message) {
				if (message.match(/^online$/)){
					if(browserSync && reload) browserSync.reload();
					if(!started) {
						started = true;
						callback();
					}
				}
			});
			server = child;

			process.on('exit', function () {
				return server.kill('SIGTERM');
			});
		};

		serverConfig.watch = watch;


		return gulp.src(options.src + '/node/index.js')
			.pipe($.webpack(serverConfig, null, webpackChangeHandler))
			.pipe(gulp.dest(path));
	}

	gulp.task('node:babel', function (callback) {
		return webpack(options.tmp + '/serve/node', false, callback, false, true);
	});

	gulp.task('node', function () {
		return webpack(options.tmp + '/serve/node', false);
	});

	gulp.task('node:watch', function (callback) {
		return webpack(options.tmp + '/serve/node', true, callback, true);
	});

	gulp.task('node:dist', function (callback) {
		return webpack(options.dist + '/node', false, callback, true, true);
	});
};
