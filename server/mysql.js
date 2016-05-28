module.exports = function(){
	return require('mq-node')({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'test'
	});
}
