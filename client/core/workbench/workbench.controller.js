define(['angular',
    'core/modules/controllers',
    'loadash',
    'bootbox',
    'core/workbench/workbench.directives',
    'core/common/directives/tree-editor'
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
                  var path = getRequestPath(tree.id);
                  $scope.currentTree.path = tree.id;
                  baseTree.one(path).getList('children').then(function(children){
                      cb(children);
                  });
                }
            };


            $scope.createTree = function($tree,obj){

                $scope.treeData = {
                    action: 'create',
                    actionLabel: 'Create Tree'
                };

                openTreeModal(function(tree){
                    tree.parentPath = $tree.id;
                    var path = getRequestPath($tree.id);
                    Restangular.all('api/trees')
                            .one(path)
                            .all('children')
                            .post(tree).then(function(response){
                                console.log(response);
                            });
                });

            };


            $scope.deleteTree = function($tree){
                bootbox.confirm("Are you sure?",function(result){
                    if(result){
                        var encodedPath = getRequestPath($tree.id);
                        Restangular.all('api/trees').one(encodedPath).remove().then(function(){

                        });
                    }
                });
            };


            function openTreeModal(onresult){
                var createModalInstance = $modal.open({
                    templateUrl: 'core/workbench/templates/createdialog.html',
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

            function getRequestPath(path){
              var npath = removeFirstSlash(path === "/" ? '/root': path);
              return npath;
            }

            function encode(text){
                return encodeURIComponent(text);
            }

            function removeFirstSlash(path){
              if(path[0] === '/'){
                return path.slice(1,path.length);
              }
              return path;
            }

    }])
    .controller('ModalInstanceTreeCtrl', ['$scope','$modalInstance','treeData','Restangular',
        function($scope,$modalInstance,treeData,Restangular){

        $scope.tree = {};

        var jcrNodeTypesParentPath = 'jcr:system/jcr:nodeTypes';
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
