define(['core/app'
,'core/admin/admin.controller'],function(app){
   'use strict';
app
  .config(['$stateProvider',function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'core/admin/admin.html',
        controller: 'AdminCtrl'
      });
  }]);
});
