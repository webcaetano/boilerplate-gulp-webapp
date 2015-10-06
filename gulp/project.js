'use strict';

var gulp = require('gulp');
var _ = require('lodash');
var runSequence = require('run-sequence');
var fs = require('fs');
var path = require('path');
var argv = require('yargs').argv;


module.exports = function(options) {
	var controllersPath = options.src+'/app/controllers';
	var stylesPath = options.src+'/styles';
	var htmlPath = options.src+'/views';
	var mainFile = options.src+'/app/index.js';

	gulp.task('new:page',function(done){
		fs.writeFileSync(path.join(controllersPath,_.camelCase(argv.page)+'.js'),fs.readFileSync('gulp/templates/controller.js'));
		fs.writeFileSync(path.join(stylesPath,_.kebabCase(argv.page)+'.page.less'),_.template(fs.readFileSync('gulp/templates/pagestyle.less'))({page:_.kebabCase(argv.page)}));
		fs.writeFileSync(path.join(htmlPath,_.camelCase(argv.page)+'.html'),_.template(fs.readFileSync('gulp/templates/page.html'))({page:_.kebabCase(argv.page)+"-page"}));
		fs.writeFileSync(mainFile,String(fs.readFileSync(mainFile))
		.replace(/\/\/<-- Controllers -->/,
			".controller('"+argv.page+"',require('./controllers/"+argv.page+"'))\n\/\/<-- Controllers -->")
		);
		done();
	})

	gulp.task('new',function(done){

		if(argv.page){
			runSequence('new:page',done);
		}
	})
};
