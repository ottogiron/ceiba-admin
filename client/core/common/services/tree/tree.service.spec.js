define(['core/common/services/tree/tree.service','ngmock'],function($){



  describe('TreeService', function(){
    var TreeService, Restangular, $httpBackend;
    var TreeService;

    beforeEach(module('jcrSmartAdmin.services'));

    beforeEach(inject(function(_TreeService_,_$httpBackend_,_Restangular_){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      TreeService = _TreeService_;
      $httpBackend = _$httpBackend_;
      Restangular = _Restangular_;
    }));

    it('should return the root tree in an array',function(done){
      var rootModel= [{path:'/'}]
      $httpBackend.expectGET('api/trees').respond(rootModel);
      
      done();
    });

    afterEach(function(){
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

  });

});
