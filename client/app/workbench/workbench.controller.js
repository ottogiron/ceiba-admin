define(['angular',
    'app/modules/controllers',
    'loadash',
    'bootbox',
    'app/workbench/workbench.directives',
    'app/common/directives/tree-editor'
    , 'components/auth/auth.service'
    , 'components/auth/user.service'

], function(angular, controllers,_,bootbox) {

    'use strict';
    controllers
            .controller('WorkbenchCtrl',
        ['$scope', '$http', 'Auth', 'User','Restangular','$modal','$state',
    function($scope, $http, Auth, User,Restangular,$modal,$state) {

            var baseTree = Restangular.all('api/trees');

            $scope.currentTree = {path: '/'};

            $scope.loadTree = function(tree,cb){
                if(tree.id === '#'){
                    //Get the root tree
                    baseTree.getList().then(function(rootTree){
                       $scope.trees =  rootTree;
                       cb(rootTree);
                    });
                }
                else{
                  var encodedPath = encode(tree.id);
                  $scope.currentTree.path = tree.id;
                  baseTree.one(encodedPath).getList('children').then(function(children){
                      cb(children);
                  });
                }
            };

            $scope.$watch('currentTree.path',function(currentPath){
              console.log($scope.jqueryTree)
            });


            $scope.createTree = function($tree,obj){

                $scope.treeData = {
                    action: 'create',
                    actionLabel: 'Create Tree'
                };

                openTreeModal(function(tree){
                    tree.parentPath = $tree.id;
                    var encodedPath = encodeURIComponent($tree.id);
                    Restangular.all('api/trees')
                            .one(encodedPath)
                            .all('children')
                            .post(tree).then(function(response){
                                console.log(response);
                            });
                });

            };


            $scope.deleteTree = function($tree){
                bootbox.confirm("Are you sure?",function(result){
                    if(result){
                        var encodedPath = encodeURIComponent($tree.id);
                        Restangular.all('api/trees').one(encodedPath).remove().then(function(){

                        });
                    }
                });
            };


            function openTreeModal(onresult){
                var createModalInstance = $modal.open({
                    templateUrl: 'app/workbench/templates/createdialog.html',
                    controller: 'ModalInstanceTreeCtrl',
                    resolve: {
                     treeData: function(){
                         return $scope.treeData;
                     }
                    }
                });

                createModalInstance.result.then(function(tree) {
                    onresult(tree);
                }, function() {
                    console.info('Modal dismissed at: ' + new Date());
                });
            }


            $scope.onNodeSelected = function(node, selection, event){
                var selectedID = selection.selected[0];
                $scope.currentTree.path = selectedID;
                $state.go('workbench.editTree',{path: selectedID},{location:false});
            };

            function encode(text){
                return encodeURIComponent(text);
            }

    }])
    .controller('ModalInstanceTreeCtrl', ['$scope','$modalInstance','treeData','Restangular',
        function($scope,$modalInstance,treeData,Restangular){

        $scope.tree = {};

        var jcrNodeTypesParentPath = encodeURIComponent('/jcr:system/jcr:nodeTypes');
        $scope.nodeTypes = Restangular.all('api/trees').one(jcrNodeTypesParentPath).all('children').getList().$object;
        $scope.treeAction = treeData;

        $scope.ok = function () {
          $modalInstance.close($scope.tree);
        };


        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
    }])
    .controller('WorkbenchTreeEditorCtrl',['$scope','$stateParams',function($scope,$stateParams){
       $scope.tree = $stateParams;
    }]);


});
