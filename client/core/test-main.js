var allTestFiles = [];
var TEST_REGEXP = /spec\.js$/i;

var pathToModule = function(path) {
  //return path.replace(/^\/base\//, '').replace(/\.js$/, '');
  return path;
};

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(pathToModule(file));
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base/client',
  paths: {
    'ngmock': "bower_components/angular-mocks/angular-mocks",
    'jquery': "bower_components/jquery/dist/jquery",
    'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap',
    'socket.io': '../socket.io/socket.io',
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
    'modules': 'core/modules',
    'jstree': 'bower_components/jstree/dist/jstree',
    'bootbox': 'bower_components/bootbox/bootbox',
    'angular.xeditable': 'bower_components/angular-xeditable/dist/js/xeditable.min'

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
    'bootstrap': ['jquery'],
    'angular.xeditable': ['angular'],
    'ngmock': ['angular']

  },
  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
