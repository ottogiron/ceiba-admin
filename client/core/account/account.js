define(['core/app'
,'core/account/login/login.controller'
,'core/account/settings/settings.controller'
,'core/account/signup/signup.controller'],function(app){
   'use strict';
app
  .config(['$stateProvider',function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'core/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'core/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'core/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  }]);
});
