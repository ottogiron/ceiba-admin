define(['app/app'
,'app/admin/admin.controller'],function(app){
   'use strict';
app
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      });
  }); 
});
