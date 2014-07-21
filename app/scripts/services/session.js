'use strict';

angular.module('jcrSmartAdminApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
