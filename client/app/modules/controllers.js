define(['angular'
    ,'app/modules/directives'
    ,'angular.ui-bootstrap-tpls']
,function(angular){
    'use strict';
    var controllers = angular.module('jcrSmartAdmin.controllers',['jcrSmartAdmin.directives','ui.bootstrap']);
    return controllers;
});