define(['core/modules/services'],function(services){

  services.service('TreeUtils',function(){

     this.getRequestPath = function(path){
      var npath = removeFirstSlash(path === "/" ? '/root': path);
      return npath;
    }

    function removeFirstSlash(path){
      if(path[0] === '/'){
        return path.slice(1,path.length);
      }
      return path;
    }
  });

});
