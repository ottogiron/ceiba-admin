requirejs.config({
   'baseUrl': '..',
    paths: {
       'jquery': "bower_components/jquery/dist/jquery",
       'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap',
       'socket.io': 'socket.io/socket.io', 
       'angular': "bower_components/angular/angular",
       'angular.resource': 'bower_components/angular-resource/angular-resource',
       'angular.cookies': 'bower_components/angular-cookies/angular-cookies',
       'angular.sanitize': 'bower_components/angular-sanitize/angular-sanitize',
       'angular.ui-bootstrap-tpls': 'bower_components/angular-bootstrap/ui-bootstrap-tpls',
       'loadash': 'bower_components/lodash/dist/lodash.compat',
       'angular.socket-io': 'bower_components/angular-socket-io/socket',
       'angular.ui-router': 'bower_components/angular-ui-router/release/angular-ui-router',
       'angular.ui-tree' : 'bower_components/angular-ui-tree/dist/angular-ui-tree',
       'restangular': 'bower_components/restangular/dist/restangular',       
       'modules': 'app/modules',
       'jstree': 'bower_components/jstree/dist/jstree',
       'bootbox': 'bower_components/bootbox/bootbox'
       
    },
    shim: {
        'angular': {            
            exports: 'angular'
        },
        'socket.io':{
            exports: 'io'
        },
        'bootbox': {
            exports: 'bootbox',
            'deps': ['jquery','bootstrap']
        },
        'angular.resource': ['angular'],
        'angular.cookies': ['angular'],
        'angular.sanitize': ['angular'],
        'angular.ui-bootstrap-tpls': ['angular'],
        'angular.ui-tree': ['angular'],
        'angular.ui-router': ['angular'],
        'angular.socket-io': ['angular','socket.io'],
        'restangular': ['angular','loadash'],
        'angular-tree-control': ['angular'],
        'jstree': ['jquery'],
        'bootstrap': ['jquery']
        
    }
});

require(['jquery'
    ,'app/app'
    ,'app/main/main'
    ,'app/account/account',
     'app/admin/admin'
    ,'app/workbench/workbench'],function($,app){
    
     app.initialize($('body')[0]);
       
});




 
      
      



