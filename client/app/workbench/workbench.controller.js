define(['angular', 'app/modules/controllers'
            , 'components/auth/auth.service'
            , 'components/auth/user.service'
], function(angular, controllers) {

    'use strict';

    controllers
            .controller('WorkbenchCtrl', ['$scope', '$http', 'Auth', 'User', function($scope, $http, Auth, User) {
                    $scope.data = [
                        {
                            "id": 3,
                            "title": "node3",
                            "nodes": [
                                {
                                    "id": 31,
                                    "title": "node3.1",
                                    "nodes": []
                                }
                            ]
                        },
                        {
                            "id": 4,
                            "title": "node4",
                            "nodes": [
                                {
                                    "id": 41,
                                    "title": "node4.1",
                                    "nodes": []
                                }
                            ]
                        },
                        {
                            "id": 2,
                            "title": "node2",
                            "nodes": [
                                {
                                    "id": 21,
                                    "title": "node2.1",
                                    "nodes": []
                                }
                            ]
                        }
                    ];
                
             
                   
                   
                }]);


});

