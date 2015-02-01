define(['core/app'
,'core/workbench/workbench.controller'],function(app){
   'use strict';
app
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('workbench', {
        url: '/workbench',
        templateUrl: 'core/workbench/workbench.html',
        controller: 'WorkbenchCtrl'
      })
      .state('workbench.editTree', {
          url: '/tree/:path',
          templateUrl: 'core/workbench/templates/workbench.tree-editor.html',
          controller: 'WorkbenchTreeEditorCtrl'
      });
  }])
  .run(['editableOptions',function(editableOptions){
    //Run options for angular x-editable
    editableOptions.theme = 'bs3';    
  }]);

});
