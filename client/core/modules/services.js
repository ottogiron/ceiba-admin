define(['angular',
        'angular.socket-io'],function(angular){
    'use strict';
    var services = angular.module('jcrSmartAdmin.services'
    ,['btford.socket-io']);
    return services;
});