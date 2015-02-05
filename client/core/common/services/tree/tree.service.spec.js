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

      var rootNodeTypeModel = {
        name: 'rep:root',
        propertyDefinitions: [],
        childNodeDefinitions: []
      }

      $httpBackend.whenGET('/api/trees').respond(rootModel);
      $httpBackend.whenGET('/api/trees/root/children').respond(childrenModel);
      $httpBackend.whenGET('/api/trees/root/nodetype').respond(rootNodeTypeModel);
      $httpBackend.whenPOST('/api/trees/root/children').respond(function(method, url, data, headers) {
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

    it('should add a new child to the parent based on his path child name',function(){
      var newTree = {name: 'test', type: 'nt:folder'};
      var path = 'root';

      $httpBackend.expectPOST('/api/trees/root/children');

      TreeService.addChild(path, newTree.name, newTree.type)
        .then(function(createdTree){
          createdTree.path.should.be.equal('/test');
        });

        $httpBackend.flush();
    });

    it('should return the tree nodetype',function(){
      var path = '/';
      $httpBackend.expectGET('/api/trees/root/nodetype')
      TreeService.getNodeType('root')
        .then(function(nodetype){
          nodetype.should.have.property('name');
        });
        $httpBackend.flush();
    });

    afterEach(function(){
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

  });

});
