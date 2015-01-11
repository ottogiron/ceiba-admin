define(['core/app'
       ,'core/main/main.controller'], function(app) {
    'use strict';
    app
    .config(function($stateProvider) {
        $stateProvider
                .state('main', {
                    url: '/',
                    templateUrl: 'core/main/main.html',
                    controller: 'MainCtrl'
                });
    });
});
