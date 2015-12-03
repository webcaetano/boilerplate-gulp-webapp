var path = require('path');
var utils = require('./../utils');

module.exports = function(app,scope){
	var views = [
		'/'
	];

	// setup views
	app.get(views,function(req,res){
		res.sendFile(path.join(__dirname, '../index.html'));
	});
}
