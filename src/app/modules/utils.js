var self = {};

self.randomIndex = function(arr){
	return arr[Math.floor(Math.random()*arr.length)];
}

self.extend = function(obj) {
	for (var i = 1; i < arguments.length; i++) for (var key in arguments[i]) obj[key] = arguments[i][key];
	return obj;
}

self.strstr = function(haystack, needle, bool) {
	var pos = 0;

	haystack += "";
	pos = haystack.indexOf(needle);
	if (pos == -1) return false;
	return (bool ? haystack.substr(0, pos) : haystack.slice(pos));
}

self.rand = function(min=0, max=100){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

self.noAccents = function($){
	return $.replace(/[àáâãäå]/,"a")
	.replace(/[èéêë]/,"e")
	.replace(/[ìíîï]/,"i")
	.replace(/[óòôõö]/,"o")
	.replace(/[ùúûü]/,"u")
	.replace(/[ÀÁÂÃÄÅ]/,"A")
	.replace(/[ÈÉÊË]/,"E")
	.replace(/[ÌÍÎÏ]/,"I")
	.replace(/[ÓÒÔÕÖ]/,"O")
	.replace(/[ÙÚÛÜ]/,"U")
	.replace(/[ç]/,"c")
	.replace(/[Ç]/,"C");
}

self.toHHMMSS = function ($) {
    var sec_num = parseInt($, 10);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours<10) hours="0"+hours;
    if (minutes<10) minutes="0"+minutes;
    if (seconds<10) seconds="0"+seconds;
    return hours+':'+minutes+':'+seconds;
}

module.exports = self;
