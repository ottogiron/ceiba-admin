define(['angular', 
    'app/modules/controllers',
    'loadash',
    'app/workbench/workbench.directives'
    , 'components/auth/auth.service'
    , 'components/auth/user.service'
], function(angular, controllers,_) {

    'use strict';    
    controllers
            .controller('WorkbenchCtrl', 
        ['$scope', '$http', 'Auth', 'User','Restangular', function($scope, $http, Auth, User,Restangular) {
            $scope.name = "otto";
            var baseTree = Restangular.all('api/trees');
            
            function encode(text){
                return encodeURIComponent(text);
            }
           
            $scope.loadTree = function(node,cb){
                if(node.id === '#'){
                    //Get the root tree
                    baseTree.getList().then(function(rootTree){                                                    
                       $scope.trees =  rootTree;
                       cb(rootTree);
                    });
                }
                else{
                  var encodedPath = encode(node.id);
                  baseTree.one(encodedPath).getList('children').then(function(children){
                      cb(children);
                  });
                }
            };
            
            
            
            
    }]);


});

