define(['angular',
    'core/modules/controllers',
    'loadash',
    'bootbox',
    'core/workbench/workbench.directives',
    'core/common/directives/tree-editor'
    , 'components/auth/auth.service'
    , 'components/auth/user.service'
    , 'core/common/services/nodetype/nodetype.service'
    , 'core/common/services/tree/tree.service'

], function(angular, controllers,_,bootbox) {

    'use strict';
    controllers
    .controller('WorkbenchCtrl',
    ['$scope', '$http', 'Auth', 'User','$modal','$state','TreeService'
    ,function($scope, $http, Auth, User, $modal ,$state ,TreeService) {

      $scope.currentTree = {path: '/'};

      $scope.loadTree = function(tree,cb){
          if(tree.id === '#'){
              //Get the root tree
              TreeService.getRoot().then(function(rootTree){
                 $scope.trees =  [rootTree];
                 cb([rootTree]);
              });
          }
          else{
            var path = getRequestPath(tree.id);
            $scope.currentTree.path = tree.id;
            TreeService.getChildren(path).then(function(children){
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
              var path = getRequestPath($tree.id);
              TreeService
              .addChild(path, tree.name, tree.type)
              .then(function(response){
                $scope.$jsTree.jstree('refresh_node',$tree.id);
              });
          });

      };


      $scope.deleteTree = function($tree){
        bootbox.confirm("Are you sure?",function(result){
          if(result){
              var path = getRequestPath($tree.id);
              TreeService.remove(path).then(function(){
                $scope.$jsTree.jstree('refresh_node',$tree.parent);
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
    .controller('WorkbenchTreeEditorCtrl'
    ,['$scope','$stateParams', 'Restangular','NodeTypeService','TreeService'
    ,function($scope, $stateParams, Restangular,NodeTypeService,TreeService){
       $scope.tree = $stateParams;
       var baseTree = Restangular.one('api/trees' + $scope.tree.path);

         $scope.user = {
           name: 'awesome user'
         };

       baseTree.get()
        .then(function(tree){
          $scope.tree = tree;

          baseTree.one('nodetype')
           .get().
            then(function(nodetype){
               $scope.nodetype = nodetype;
            });

        });


    }]);


});
