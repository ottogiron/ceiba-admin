define(['angular', 
    'app/modules/controllers',
    'loadash',
    'app/workbench/workbench.directives'
    , 'components/auth/auth.service'
    , 'components/auth/user.service',
    
], function(angular, controllers,_) {

    'use strict';    
    controllers
            .controller('WorkbenchCtrl', 
        ['$scope', '$http', 'Auth', 'User','Restangular','$modal', function($scope, $http, Auth, User,Restangular,$modal) {
            
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
            
            
            
            $scope.createNode = function($node,obj){
                $scope.nodeData = {
                    path: $node.id,
                    action: 'create',
                    actionLabel: 'Create Node'
                };
                var createModalInstance = $modal.open({
                    templateUrl: 'app/workbench/templates/createdialog.html',
                    controller: 'ModalInstanceCtrl',
                    resolve: {
                     nodeData: function(){
                         return $scope.nodeData;
                     }    
                    }
                });

                createModalInstance.result.then(function(node) {
                    console.log(node);
                }, function() {
                    console.info('Modal dismissed at: ' + new Date());
                });
            };           
            
    }])
    .controller('ModalInstanceCtrl',
    ['$scope','$modalInstance','nodeData','Restangular'
        ,function($scope,$modalInstance,nodeData,Restangular){
        
        $scope.node = {};
        
        var jcrNodeTypesParentPath = encodeURIComponent('/jcr:system/jcr:nodeTypes');
        $scope.nodeTypes = Restangular.all('api/trees').one(jcrNodeTypesParentPath).all('children').getList().$object;        
        $scope.nodeAction = nodeData;
        
        $scope.ok = function () {
          $modalInstance.close($scope.node);
        };

        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
    }]);


});

