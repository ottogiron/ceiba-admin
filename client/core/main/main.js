define(['core/app'
       ,'core/main/main.controller'], function(app) {
    'use strict';
    app
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
                .state('main', {
                    url: '/',
                    templateUrl: 'core/main/main.html',
                    controller: 'MainCtrl'
                });
    }]);
});
