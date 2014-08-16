define(['angular', 'app/modules/controllers'
            , 'components/auth/auth.service'
            , 'components/auth/user.service'
], function(angular, controllers) {

    'use strict';

    controllers
            .controller('WorkbenchCtrl', 
        ['$scope', '$http', 'Auth', 'User','Restangular', function($scope, $http, Auth, User,Restangular) {
            var baseTree = Restangular.all('api/trees');

            //Get the root tree
            baseTree.getList().then(function(rootTree){
               rootTree[0].children = [];              
               $scope.trees =  rootTree;                
            });
            
            $scope.showSelected = function(node){
                baseTree.all('children').post({path:node.path})
                        .then(function(children){
                    node.children = children;
                    $scope.expandedNodes.push(node);
                });
               
            };             
            
    }]);


});

