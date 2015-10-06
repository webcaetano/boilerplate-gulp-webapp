'use strict';

var gulp = require('gulp');
var mocha = require('gulp-spawn-mocha');
var runSequence = require('run-sequence');


module.exports = function(options) {
	gulp.task('pretest',function(done){
		runSequence('node:babel',done);
	})

	var getTest = function(env){
		return gulp.src('test/index.js', {read: false})
		.pipe(mocha({
			env: {
				test:true,
				NODE_ENV:env
			}
		}))
		.once('error', function () {
			process.exit(1);
		})
		.once('end', function () {
			process.exit();
		});
	}


	gulp.task('test', ['pretest'], function () {
		return getTest('dev');
	});

	gulp.task('test:dist', function (done) {
		runSequence('node:dist',function(){
			return getTest('dist');
		});
	})

	gulp.task('build:test', ['test:dist'])
};
