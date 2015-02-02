define(['core/common/services/nodetype/nodetype.service','ngmock'],function($){



  describe('NodeTypeService', function(){
    var NodeTypeService;

    beforeEach(module('jcrSmartAdmin.services'));

    beforeEach(inject(function(NodeTypeService){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      NodeTypeService = NodeTypeService;
    }));

    it('should return something',function(){

    });

  });

});
