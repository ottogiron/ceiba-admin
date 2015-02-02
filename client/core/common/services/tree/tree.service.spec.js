define(['core/common/services/tree/tree.service','ngmock'],function($){



  describe('TreeService', function(){
    var TreeService;

    beforeEach(module('jcrSmartAdmin.services'));

    beforeEach(inject(function(TreeService){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      TreeService = TreeService;
    }));

    it('should return something',function(){

    });

  });

});
