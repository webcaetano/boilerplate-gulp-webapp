'use strict';

var utils = require('./../modules/utils');

module.exports = ['$http', '$rootScope', '$q', function($http,$rootScope,$q) {
	var self = this;
	self.mQList = [];

	var _http = function(method,preload,multi,url,data,callback,parent){
		var _self={
			'urlPrefix':(utils.strstr(location.host,'localhost') ? 'http://localhost:3000' : 'http://localhost'),
			'callback':callback,
			'data':data,
			'run':undefined,
			'debug':function(data){
				if(data==undefined && !this.toDebug){ this.toDebug=true; return; }
				if($rootScope.debug && !/msie/.test(navigator.userAgent.toLowerCase()))console.log(data);
				return this;
			},
			'query':null,
			'toDebug':false,
			'promise':undefined,
			'parent':parent
		};
		var q = $q.defer();

		if(typeof url === 'object'){
			_self['urlPrefix']='';
			url=url['url'];
		}
		if(typeof data === 'function'){
			_self['callback']=data;
			_self['data']=null;
			_self['parent']=callback;
		}

		// if(preload && $rootScope.loadBar)$rootScope.loadBar.start();

		if(method=='post'){
			_self['run']=$http[method](_self['urlPrefix']+url,_self['data']);
		} else {
			_self['run']=$http[method](_self['urlPrefix']+url,(!_self['data'] ? null : {params:_self['data']}));
		}

		_self['query']=_self['run'].success(function(data){
			if(_self['callback']) _self['callback'].apply((_self['parent']!=undefined ? _self['parent'] : null),[data]);
			// if(preload && $rootScope.loadBar) $rootScope.loadBar.end();

			if(_self.toDebug) _self.debug.apply((_self['parent']!=undefined ? _self['parent'] : null),[data]);

			q.resolve();
		});

		_self.promise = q.promise;
		if(multi) self.mQList.push(_self);

		return _self;
	}

	self.mQRun = function(callback){
		var testAllList = self.mQList.length;
		var c = 0;
		// $rootScope.startLoad();

		for(var i=0;i<self.mQList.length;i++){
			self.mQList[i].promise.then(function(){
				if(++c==testAllList){
					if(callback) callback.apply();
					// $rootScope.endLoad();
				}
			});
		}
	}

	self.http=_http;
	// self.post = _http.p('post',true,false);
	// self.get = _http.p('get',true,false);

	self.post = _http.bind(null,'post',true,false);
	self.get = _http.bind(null,'get',true,false);

	// self._post = _http.p('post',false,true);
	// self._get = _http.p('get',false,true);

	return self;
}];
