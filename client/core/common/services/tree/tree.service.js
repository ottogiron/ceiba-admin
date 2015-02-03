define(['core/modules/services'],function(services){

  services.service('TreeService',['Restangular',function(Restangular){
    var basePath = 'api/trees';

    var baseTree = Restangular.all(basePath);

    this.getRoot = function(){
      return Restangular.one(basePath).get();
    };

    this.getChildren = function(path){
      return baseTree.one(path).getList('children');
    };

    this.addChild = function(path, _name_, _type_){
      var tree = {name: _name_, type: _type_};
      return baseTree.one(path)
            .all('children')
            .post(tree);
    };

    this.remove = function(path){
      return baseTree
            .one(path).remove();
    };

  }]);

});
