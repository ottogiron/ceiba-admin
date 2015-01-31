'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var jcrOakAPI = require('jcr-oak-api');
var async = require('async');
var jcrUtils =  require('../../jcr/utils');
var treeService = require('../../api/tree/tree.service');

describe('GET /api/trees', function() {

    var connection;

    beforeEach(function(done){
      connection = jcrUtils.getConnection();
      done();
    });

    afterEach(function(done){
      if(connection){
        connection.end();
      }
      done();
    });


  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/trees')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should return a tree with his properties',function(done){
    treeService.getTree(connection,'/',function(err,tree){
        if(err){throw err};
        tree.should.be.instanceof(Object);
        tree.should.have.property('properties');
        tree.properties.should.have.property('jcr:primaryType');
        done();
    });
  });

  it('should return the root tree', function(done){

    treeService.getRootTree(connection, function(err,rootTree){
        rootTree.path.should.be.equal('/');
        done();
    });

  });

  it('should return the children of a tree based on his path', function(done){
    var path = '/';

    treeService.getChildren(connection, path, function(err, children){
      if(err){throw err}
      children.should.be.instanceof(Array);
      children.length.should.be.above(0);
      done();
    });


  });

});
