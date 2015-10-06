var utils = require('./utils');
var path = require('path');

module.exports = function(express,master){
	var session = require('express-session');
	// var MongoStore  = require('connect-mongo')(session);
	var favicon = require('serve-favicon');
	var bodyParser = require('body-parser');
	var compress = require('compression');
	// var cors = require('cors');
	var app = express();

	app.set('port', process.env.PORT || 4000);

	utils.dBug(process.env.NODE_ENV, 'info');

	if(process.env.NODE_ENV=='dev'){
		app.use('/bower_components',  express.static(path.join(__dirname, '../../../bower_components')));
		app.use('/app',  express.static(path.join(__dirname, '../app')));
		app.use('/directives',  express.static(path.join(__dirname, '../../../src/app/directives')));
		app.use('/lib',  express.static(path.join(__dirname, '../../../src/lib')));
		app.use('/styles',  express.static(path.join(__dirname, '../styles')));
		app.use('/views',  express.static(path.join(__dirname, '../../../src/views')));
		app.use('/images',  express.static(path.join(__dirname, '../../../src/images')));
		app.use(favicon(path.join(__dirname, '../../../src/favicon.ico')));
	} else {
		app.use('/styles',  express.static(path.join(__dirname, '../styles')));
		app.use('/views',  express.static(path.join(__dirname, '../views')));
		app.use('/scripts',  express.static(path.join(__dirname, '../scripts')));
		app.use('/images',  express.static(path.join(__dirname, '../images')));
	}

	// app.use(cors());
	app.set('views', path.join(__dirname, '../'));
	app.use(compress());
	app.use(bodyParser.json({limit: '10mb'}));
	app.use(bodyParser.urlencoded({ extended: true, keepExtensions: true, defer: true , limit: '10mb' }));

	// app.use(session({
	// 	secret:'monkey',
	// 	resave:false,
	// 	saveUninitialized:false,
	// 	store: new MongoStore({
	// 		db: 'sessionstore'
	// 	})
	// }));

	app.start = function(){
		app.listen(app.get('port'),function(){
			if(process.send)process.send('online');
			utils.dBug('[Http]		[online] '+app.get('port'),'success');
		});
	}
	return app;
}

process.on('uncaughtException', function (err) {
	utils.dBug(err.stack,'error');
	utils.dBug("Node NOT Exiting...",'error');
});
