define(['core/modules/controllers'
        ,'components/auth/auth.service'], function(controllers) {
    'use strict';
    controllers
     .controller('LoginCtrl', function($scope, Auth, $location, $window) {
        $scope.user = {};
        $scope.errors = {};

        $scope.login = function(form) {
            $scope.submitted = true;

            if (form.$valid) {
                Auth.login({
                    email: $scope.user.email,
                    password: $scope.user.password
                })
                        .then(function() {
                            // Logged in, redirect to home
                            $location.path('/');
                        })
                        .catch(function(err) {
                            $scope.errors.other = err.message;
                        });
            }
        };

        $scope.loginOauth = function(provider) {
            $window.location.href = '/auth/' + provider;
        };
        });
});

