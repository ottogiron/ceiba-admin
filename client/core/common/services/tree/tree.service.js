define(['core/modules/services'],function(services){

  services.service('TreeService',['Restangular',function(Restangular){
    var basePath = 'api/trees';

    var baseTree = Restangular.all(basePath);

    this.getRoot = function(){
      return Restangular.one(basePath).get();
    };

    this.getChildren = function(path){
      return baseTree.one(path).getList('children');
    }

  }]);

});
