define(['core/common/services/tree/tree.service','ngmock'],function($){



  describe('TreeService', function(){

    var TreeService;

    beforeEach(module('jcrSmartAdmin.services'));

    beforeEach(inject(function(_TreeService_,_Restangular_){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      TreeService = _TreeService_;    
    }));

    it('should return the root tree in an array',function(done){
      done();
    });

  });

});
