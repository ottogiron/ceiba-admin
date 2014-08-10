define(['app/app'
,'app/workbench/workbench.controller'],function(app){
   'use strict';
app
  .config(function ($stateProvider) {
    $stateProvider
      .state('workbench', {
        url: '/workbench',
        templateUrl: 'app/workbench/workbench.html',
        controller: 'WorkbenchCtrl'
      });
  }); 
});
