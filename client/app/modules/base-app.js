define(['angular'],function(angular){
	'use strict';
	var dependencies = [];	
	var initialize = function(element){
		angular.bootstrap(element,[this.name]);
	};	
	
	var create = function(appId,pDependencies){
		var newDependencies = dependencies.slice(0);
		if(pDependencies){
			newDependencies = newDependencies.concat(pDependencies);
		}
		
		var app = angular.module(appId,newDependencies);
		app.initialize = initialize;
		
		return app;
	};
	
	return {
		create: create
	};
});