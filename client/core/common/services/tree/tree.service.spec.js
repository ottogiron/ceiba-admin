define(['core/common/services/tree/tree.service','ngmock'],function($){

  var baseTree;
  var TreeService, Restangular, $httpBackend;

  describe('TreeService', function(){

    beforeEach(module('jcrSmartAdmin.services'));

    beforeEach(inject(function(_TreeService_,_$httpBackend_,_Restangular_){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      TreeService = _TreeService_;
      $httpBackend = _$httpBackend_;
      Restangular = _Restangular_;
      baseTree = Restangular.all('api/trees');
      var rootModel= {path:'/'};
      var childrenModel = [
                            {
                              "path": "/jcr:system",
                              "root": false,
                              "exists": true,
                              "name": "jcr:system",
                              "status": 0
                            },
                            {
                              "path": "/oak:index",
                              "root": false,
                              "exists": true,
                              "name": "oak:index",
                              "status": 0
                            },
                            {
                              "path": "/rep:security",
                              "root": false,
                              "exists": true,
                              "name": "rep:security",
                              "status": 0
                            }
                          ];
      var treePostModel = {"path":"/test","root":false,"exists":true,"name":"test","status":0};

      $httpBackend.whenGET('/api/trees').respond(rootModel);
      $httpBackend.whenGET('/api/trees/root/children').respond(childrenModel);
      $httpBackend.whenPOST("/accounts/1").respond(function(method, url, data, headers) {
        return [200, treePostModel, ""];
      });


    }));

    it('should return the root tree',function(){
      $httpBackend.expectGET('/api/trees');

      TreeService
        .getRoot()
        .then(function(rootTree){
          rootTree.path.should.be.equal('/');
        });

      $httpBackend.flush();

    });

    it('should return a list of the root arrays',function(){
      $httpBackend.expectGET('/api/trees/root/children');
      TreeService
      .getChildren('root')
      .then(function(children){
          children.should.be.instanceOf(Array);
          children.length.should.be.above(0);
      });
      $httpBackend.flush();
    });

    afterEach(function(){
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

  });

});
