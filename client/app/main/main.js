define(['app/app'
       ,'app/main/main.controller'], function(app) {
    'use strict';
    app
    .config(function($stateProvider) {
        $stateProvider
                .state('main', {
                    url: '/',
                    templateUrl: 'app/main/main.html',
                    controller: 'MainCtrl'
                });
    });
});
