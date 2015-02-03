define(['angular','restangular','angular.socket-io'],function(angular){
    'use strict';
    var services = angular.module('jcrSmartAdmin.services'
    ,['restangular','btford.socket-io']);
    return services;
});
