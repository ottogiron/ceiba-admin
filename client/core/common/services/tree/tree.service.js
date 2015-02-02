define(['core/modules/services'],function(services){

  services.service('TreeService',['Restangular',function(Restangular){

    var baseTree = Restangular.all('api/trees');
    

  }]);

});
