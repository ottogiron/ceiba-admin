requirejs.config({
   'baseUrl': '..',
    paths: {
       'jquery': "bower_components/jquery/dist/jquery",
       'socket.io': 'socket.io/socket.io', 
       'angular': "bower_components/angular/angular",
       'angular.resource': 'bower_components/angular-resource/angular-resource',
       'angular.cookies': 'bower_components/angular-cookies/angular-cookies',
       'angular.sanitize': 'bower_components/angular-sanitize/angular-sanitize',
       'angular.ui-bootstrap-tpls': 'bower_components/angular-bootstrap/ui-bootstrap-tpls',
       'loadash': 'bower_components/lodash/dist/lodash.compat',
       'angular.socket-io': 'bower_components/angular-socket-io/socket',
       'angular.ui-router': 'bower_components/angular-ui-router/release/angular-ui-router',
       'modules': 'app/modules'
       
    },
    shim: {
        'angular': {            
            exports: 'angular'
        },
        'socket.io':{
            exports: 'io'
        },
        'angular.resource': {deps:['angular']},
        'angular.cookies': {deps:['angular']},
        'angular.sanitize': {deps:['angular']},
        'angular.ui-bootstrap-tpls': {deps:['angular']},
        'angular.ui-router': {deps:['angular']},
        'angular.socket-io': {deps: ['angular','socket.io']}
    }
});

require(['jquery'
    ,'app/app'
    ,'app/main/main'
    ,'app/account/account'],function($,app){    
    app.initialize($('body')[0]);
});




 
      
      



