'use strict';

angular.module('myApp', ['ngRoute'])
//<-- Controllers -->
//<-- Directives -->
//<-- Service -->

.config(function ($routeProvider,$locationProvider,$interpolateProvider,$httpProvider) {
	$httpProvider.defaults.withCredentials = true;

	var $when = function(route,obj){
		if(!angular.isArray(route) || route.length==0){
			$routeProvider['when'](route,obj);
		} else  {
			for(var i=0;i<route.length;i++) $routeProvider['when'](route[i],obj);
		}
		return;
	}

	$routeProvider.otherwise({
		redirectTo: '/'
	});

	// $when('/',{
	// 	templateUrl: 'views/mid.html'
	// 	// controller: 'MainCtrl'
	// });

	$locationProvider.html5Mode(true);
});


